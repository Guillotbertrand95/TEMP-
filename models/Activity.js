import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true, // obligatoire pour savoir à qui appartient l'activité
		},
		category: { type: String }, // facultatif maintenant
		subCategory: { type: String }, // facultatif
		date: { type: Date }, // facultatif, si non fourni => null
		duration: { type: Number }, // en minutes
		distance: { type: Number }, // en km
		intensity: { type: String }, // "Facile", "Modéré", "Difficile"
		calories: { type: Number },
		comment: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
