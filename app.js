import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/ProfileRoutes.js"; // corrigé

import activityRoutes from "./routes/ActivityRoutes.js";
const app = express();

// Middlewares globaux
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Authentification
app.use("/api/profile", profileRoutes); // Profil et infos utilisateur
app.use("/api/activities", activityRoutes); // Route pour gérer les activités
export default app;
