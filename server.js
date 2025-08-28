// server.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js"; // Importe l'application Express depuis app.js

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connexion MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("✅ MongoDB connecté");
		// Lancement du serveur après la connexion à la DB
		app.listen(PORT, () =>
			console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
		);
	})
	.catch((err) => console.error("❌ Erreur MongoDB :", err));
