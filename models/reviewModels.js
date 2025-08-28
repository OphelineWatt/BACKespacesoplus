import db from '../configuration/bd.js';

export const addReview = (text, rating, user_id, place_id) => {

    const insert = "INSERT INTO reviews (text, rating, place_id, user_id) VALUES (?,?,?,?);";

    // Exécute la requête d'insertion avec les paramètres fournis
    // et retourne le résultat de la requête
    return db.query(insert, [text, rating, user_id, place_id]);
}

export const getReviewById = async (idReview) => {
  const query = "SELECT user_id FROM reviews WHERE id_reviews = ?";
  const [rows] = await db.query(query, [idReview]);
  return rows[0];
};

export const getReviewsByPlace= (placeId) => {
    const get = `SELECT id_reviews, date, text, rating, place_id, user_id, username FROM reviews
    INNER JOIN users on id_user = user_id 
    WHERE place_id = ?;`;

    return db.query(get,[placeId]);
}

export const getAverageRating = async (placeId) => {
  const [rows] = await db.query(
    `SELECT AVG(rating) AS averageRating
     FROM reviews
     WHERE place_id = ?`,
    [placeId]
  );
  // Si pas d’avis, avg peut être null
  const avg = rows[0].averageRating;
  return avg !== null ? Number(avg).toFixed(1) : '0.0';
};


export const updateReview = (id_review, rating, text) => {
    const update = "UPDATE reviews SET rating = ?, text = ?  WHERE id_reviews = ?;";
    
    return db.query(update, [rating, text, id_review]);

}

export const deleteReviewById = (idReview) => {
  const del = "DELETE FROM reviews WHERE id_reviews = ?;";
  return db.query(del, [idReview]);
};
