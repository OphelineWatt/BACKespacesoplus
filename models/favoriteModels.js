import db from '../configuration/bd.js';

export const addFavorites = (user_id, place_id) => {

    const insert = "INSERT INTO favorites (place_id, user_id) VALUES (?,?);";

    // Exécute la requête d'insertion avec les paramètres fournis
    // et retourne le résultat de la requête
    return db.query(insert, [user_id, place_id]);
}

export const getFavoriteById= (userId) => {
    const get = `SELECT name, address, label, place_id FROM places
    INNER JOIN category on id_category = category_id 
    INNER JOIN favorites on id_place = place_id
    WHERE favorites.user_id = ?;`;

    return db.query(get,[userId]);
}

export const deleteFavorite = async (idFavorite) => {
    const del = "DELETE FROM favorites WHERE id_favorite = ?";
    const [result] = await db.query(del, [idFavorite]);
    return result;
}