import express from "express";
import Profile from "../models/Profile.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			["name", "email"]
		);
		if (!profile) {
			return res.status(404).json({ error: "Profil non trouvé" });
		}
		res.json(profile);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// PUT : créer ou mettre à jour le profil
router.put("/", authMiddleware, async (req, res) => {
	try {
		const updatedProfile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ ...req.body, user: req.user.id },
			{ new: true, upsert: true }
		);
		res.json(updatedProfile);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});
router.delete("/", authMiddleware, async (req, res) => {
	try {
		// Supprimer le profil de l'utilisateur
		await Profile.findOneAndDelete({ user: req.user.id });

		// Supprimer l'utilisateur
		await User.findByIdAndDelete(req.user.id);

		res.json({ message: "Compte et profil supprimés avec succès" });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Erreur lors de la suppression du compte",
		});
	}
});

export default router;
