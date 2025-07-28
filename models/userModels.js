import db from '../configuration/bd.js';

export const addUser = (username, mail, cryptedPassword) => {

    const insertUser = "INSERT INTO users (username, mail, password, admin) VALUES (?,?,?,0);";

    // Exécute la requête d'insertion avec les paramètres fournis
    // et retourne le résultat de la requête
    return db.query(insertUser, [username, mail, cryptedPassword]);
}

// RQT pour la connexion
export const loginUser = (mail) => {
        const selectUser = "SELECT id_User, username, password from users where mail like ?;";

        return db.query(selectUser, [mail]);
}
