import db from '../configuration/bd.js';

export const addUser = (username, mail, cryptedPassword) => {

    const insertUser = "INSERT INTO users (username, mail, password, admin) VALUES (?,?,?,0);";

    // Exécute la requête d'insertion avec les paramètres fournis
    // et retourne le résultat de la requête
    return db.query(insertUser, [username, mail, cryptedPassword]);
}
