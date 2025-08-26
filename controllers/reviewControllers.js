import * as reviewModels from "../models/reviewModels.js";
import * as placeModels from "../models/placeModels.js";


export const addReview = async (req, res) => {
  try {
    const { text, rating, place_id } = req.body;
    const userId = req.user.idUser;

    await reviewModels.addReview(text, rating, place_id, userId);
    const averageRating = await reviewModels.getAverageRating(place_id);
    
    await placeModels.updateGlobalRating(averageRating, place_id);

    res.status(201).json({ message: "avis ajouté" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'enregistrement de l'avis",
      error,
    });
  }
};

export const getReviewUsers = async (req, res) => {
  const placeId = req.params.placeId;

  try {
    const reviews = await reviewModels.getReviewsByPlace(placeId);

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: `Pas d'avis trouvé pour ce lieu` });
    }
    res.status(200).json(
      reviews);
  } catch (error) {
    console.error(`Error fetching favorites:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateReview = async (req, res) => {
  const idReview = req.params.idReview;
  const { rating, text } = req.body;
  const idUser = req.user.idUser;

  try {
    const existingReview = await reviewModels.getReviewById(idReview);

    if (existingReview.user_id !== idUser) {
      return res
        .status(403)
        .json({ message: "Accès interdit : cet avis ne vous appartient pas" });
    }

    await reviewModels.updateReview(idReview,rating, text);

    res.status(200).json({ message: "Avis modifié avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReview = async (req, res) => {
  const idReview = req.params.idReview;
  const idUser = req.user.idUser;
  const isAdmin = req.user.isAdmin;

  try {
    const existingReview = await reviewModels.getReviewById(idReview);

    if (!existingReview) {
      return res.status(404).json({ message: "Avis introuvable" });
    }

    
    if (existingReview.user_id !== idUser && !isAdmin) {
      return res.status(403).json({ message: "Accès interdit : vous n'êtes pas autorisé à supprimer cet avis" });
    }

    const result = await reviewModels.deleteReviewById(idReview);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Échec de la suppression : avis introuvable" });
    }

    res.status(200).json({ message: "Avis supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression" });
  }
};