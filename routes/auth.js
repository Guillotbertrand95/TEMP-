import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ----------- INSCRIPTION -----------
router.post("/register", async (req, res) => {
	console.log("Body reçu :", req.body); // 🔥 ajoute ça pour voir ce que le backend reçoit
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: "Email déjà utilisé" });

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();

		res.json({ message: "Utilisateur inscrit avec succès !" });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Erreur lors de l'inscription" });
	}
});

// ----------- CONNEXION -----------
router.post("/login", async (req, res) => {
	console.log("connexion ok");
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(400)
				.json({ message: "Email ou mot de passe incorrect" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res
				.status(400)
				.json({ message: "Email ou mot de passe incorrect" });

		const token = jwt.sign(
			{ id: user._id, email: user.email },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.json({
			message: "Connexion réussie ✅",
			token,
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Erreur serveur lors de la connexion",
		});
	}
});

export default router;
