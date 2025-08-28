import express from "express";
import Profile from "../models/Profile.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET : récupérer le profil de l'utilisateur connecté
router.get("/", authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
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

export default router;
