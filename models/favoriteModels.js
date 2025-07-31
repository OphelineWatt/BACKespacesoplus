import db from '../configuration/bd.js';

export const addFavorites = (user_id, place_id) => {

    const insert = "INSERT INTO favorites (place_id, user_id) VALUES (?,?);";

    // Exécute la requête d'insertion avec les paramètres fournis
    // et retourne le résultat de la requête
    return db.query(insert, [user_id, place_id]);
}