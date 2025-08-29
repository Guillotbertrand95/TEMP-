import express from "express";

import Activity from "../models/Activity.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//GET : toutes les activités de l'utilisateur connecté
router.get("/", authMiddleware, async (req, res) => {
	try {
		const activities = await Activity.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(activities);
	} catch (error) {
		res.status(500).json({ message: "Erreur serveur" });
	}
});
//POST : crééer une nouvelle activité
router.post("/", authMiddleware, async (req, res) => {
	try {
		const newActivity = new Activity({ ...req.body, user: req.user.id });
		const saved = await newActivity.save();
		res.json(saved);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//PUT : mettre à jour les activités existante
router.put("/:id", authMiddleware, async (req, res) => {
	try {
		const activity = await Activity.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true, runValidators: true }
		);

		res.json(activity);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//DELETE : supprimer une activité
router.delete("/:id", authMiddleware, async (req, res) => {
	try {
		const deleted = await Activity.findOneAndDelete({
			_id: req.params.id,
			user: req.user.id,
		});
		res.json({ message: "Activité supprimée", deleted });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});
// Supprimer toutes les activités de l'utilisateur connecté
router.delete("/", authMiddleware, async (req, res) => {
	try {
		await Activity.deleteMany({ user: req.user.id }); // ✅ correction ici
		res.json({
			message: "Toutes les activités ont été supprimées avec succès.",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Erreur lors de la suppression des activités.",
		});
	}
});
export default router;
