import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	name: { type: String },
	age: { type: Number },
	height: { type: Number },
	weight: { type: Number },
	goal: { type: String }, // unifié avec le frontend
});

export default mongoose.model("Profile", profileSchema);
