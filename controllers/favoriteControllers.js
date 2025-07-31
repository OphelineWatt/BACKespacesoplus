import dotenv from "dotenv";
import * as favoriteModels from '../models/favoriteModels.js'


dotenv.config();

export const addFavorite = async (req, res) => {
  
  try {
    const { placeId } = req.body;
    const userId = req.user.idUser;

    console.log(userId);
    
    
    await favoriteModels.addFavorites(placeId,userId);

    res.status(201).json({ message: "lieu crée" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de l'enregistrement d'un lieu",
        error
      });
  }
};