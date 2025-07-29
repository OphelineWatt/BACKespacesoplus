import db from '../configuration/bd.js';

export const checkUsernameExists = (username) => {
    const query = "SELECT id_user FROM users WHERE username = ?";
    return db.query(query, [username]);
};

export const checkMailExists = (mail) => {
    const query = "SELECT id_user FROM users WHERE mail = ?";
    return db.query(query, [mail]);
};

export const addUser = (username, mail, cryptedPassword,admin) => {

    const insertUser = "INSERT INTO users (username, mail, password, admin) VALUES (?,?,?,0);";

    // Exécute la requête d'insertion avec les paramètres fournis
    // et retourne le résultat de la requête
    return db.query(insertUser, [username, mail, cryptedPassword,admin]);
}
// RQT pour la connexion
export const loginUser = (mail) => {
        const selectUser = "SELECT id_user, username, password, admin from users where mail like ?;";

        return db.query(selectUser, [mail]);
}

export const getProfileUser = (id_user) => {
    const getProfile = "SELECT id_user, username, mail, admin FROM users WHERE id_user = ?;";

    // Exécute la requête de sélection avec l'ID utilisateur fourni
    return db.query(getProfile, [id_user]);
}

export const getAllProfile = () => {
    const getProfile = "SELECT id_user, username, mail, admin FROM users;";

    // Exécute la requête de sélection avec le role 
    return db.query(getProfile);
}

export const updateUserProfile = (username, mail, userId) => {
    const updateUser = "UPDATE users SET username = ?, mail = ? WHERE id_user = ?;";
    
    return db.query(updateUser, [username, mail, userId]);
}