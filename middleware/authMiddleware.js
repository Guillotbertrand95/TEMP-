import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"
	if (!token)
		return res
			.status(401)
			.json({ message: "Accès refusé, token manquant" });

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded; // On récupère id et email
		next();
	} catch (error) {
		res.status(401).json({ message: "Token invalide" });
	}
};
