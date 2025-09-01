import dotenv from "dotenv";
import * as favoriteModels from "../models/favoriteModels.js";

dotenv.config();

export const addFavorite = async (req, res) => {
  try {
    const userId = req.user.idUser;
    const { placeId } = req.body;

    await favoriteModels.addFavorites( userId,placeId);

    res.status(200).json({ message: "supression du favori ok" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'enregistrement d'un lieu",
      error,
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
};

export const deleteFavorite = async (req, res) => {
  const idPlace = req.params.idPlace;
  const idUser = req.user.idUser;

  try {
    await favoriteModels.deleteFavorite(idPlace, idUser);

    res.status(200).json({ message: "Favori supprimé avec succés" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur lors de la supression", error });
  }
};
