import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bdd from "./configuration/bd.js";
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import placeRoutes from "./routes/placeRoutes.js"
import favoriteRoutes from "./routes/favoriteRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"



// création de l'application express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
// utilisation de dotenv pour charger les variables d'environnement
dotenv.config();

// utilisation des routes
app.use("/api", userRoutes,categoryRoutes,placeRoutes,favoriteRoutes, reviewRoutes);

// démarrage du server sur le port défini dans le fichier .env
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
  if(bdd) {
  console.log("Database connection established");
  }
});

export default app;