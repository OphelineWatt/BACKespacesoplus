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

export const updateUsername = (username, userId) => {
    const updateUsername = "UPDATE users SET username = ? WHERE id_user = ?;";
    
    return db.query(updateUsername, [username, userId]);
}

export const updateMail = (mail, userId) => {
    const updateUsername = "UPDATE users SET mail = ? WHERE id_user = ?;";
    
    return db.query(updateUsername, [mail, userId]);
}

export const getUserPassword = (idUser) => {
    const selectUser = "SELECT password, username, mail FROM users WHERE id_user = ?;";

    return db.query(selectUser, [idUser])
}

export const updateUserPassword = (cryptedNewPassword, userId) => {
     // préparation de la requete de mise à jour
    const updatePassword = "UPDATE users SET password = ? WHERE id_user = ?;";

    // Exécute la requête de mise à jour avec le nouveau mot de passe et l'ID utilisateur
    return db.query(updatePassword, [cryptedNewPassword, userId]);
}

export const deleteUserByAdmin= (idUser) => {
    
    const deleteProfile = `DELETE FROM users WHERE id_user = ?;`;

    // Exécute la requête de sélection avec l'ID utilisateur fourni
    return db.query(deleteProfile, [idUser]);
}

export const deleteAccount= (idUser) => {
    
    const deleteProfile = `DELETE FROM users WHERE id_user = ?;`;

    // Exécute la requête de sélection avec l'ID utilisateur fourni
    return db.query(deleteProfile, [idUser]);
}

export const forgottenPassword = async (mail) => {
    const checkEmail = "SELECT id_user, username, mail FROM users WHERE mail = ?";
    const [result] = await db.query(checkEmail, [mail]);
    return result;
}

export const passwordReset = async (password,idUser) => {
    const update = "UPDATE users SET password = ? WHERE id_user = ?";
    const [result] = await db.query(update, [ password,idUser]);
    return result;
}