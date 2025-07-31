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

export const getFavoriteUsers = async (req, res) => {

    const idUser = req.user.idUser;

    try {
        const favorites = await favoriteModels.getFavoriteById(idUser);
        if (favorites.length === 0) {
            return res.status(404).json({ message: `Pas de favoris trouvé` });
        }
        res.status(200).json(favorites);       
    } catch (error) {
        console.error(`Error fetching favorites:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteFavorite = async (req, res) => {
    const idFavorite = req.params.idFavorite;

    try {
        await favoriteModels.deleteFavorite(idFavorite);
        
        res.status(200).json({ message: "Favori supprimé avec succés" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "erreur lors de la supression", error });
    }
}
