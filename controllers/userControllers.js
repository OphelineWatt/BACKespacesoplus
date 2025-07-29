import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userModels from "../models/userModels.js";

dotenv.config();

// fonction d'inscription utilisateur
// cette fonction est appelée depuis le fichier userRoutes.js
export const register = async (req, res) => {
  // récupération des données du corps de la requête
  const { username, mail, password } = req.body;

  try {
    // Vérifier si le username existe déjà
    const [usernameExists] = await userModels.checkUsernameExists(username);
    if (usernameExists.length > 0) {
      return res
        .status(409)
        .json({ message: "Nom d'utilisateur déjà utilisé" });
    }

    // Vérifier si le mail existe déjà
    const [mailExists] = await userModels.checkMailExists(mail);
    if (mailExists.length > 0) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    // cryptage du password
    const cryptedPassword = await bcrypt.hashSync(password, 10);

    // appel de la fonction addUser du modèle userModels
    // cette fonction permet d'insérer un nouvel utilisateur dans la base de données
    await userModels.addUser(username, mail, cryptedPassword);
    res.status(201).json({ message: "utilisateur créé" });
  } catch (error) {
    // gestion en cas d'erreur
    res.status(500).json({ message: "erreur lors de l'inscription", error });
  }
};

export const login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    // cette fonction permet de récupérer les données de l'utilisateur à partir de son mail
    const [result] = await userModels.loginUser(mail);

    const userData = result[0];

    if (result) {
      const checkPassword = await bcrypt.compare(password, userData.password);

      if (checkPassword == true) {
        // création du token : données : iduser + username + admin : 0/1
        const token = jwt.sign(
          {
            idUser: userData.id_user,
            username: userData.username,
            admin: userData.admin,
          },
          process.env.SECRET_KEY,
          { expiresIn: "6h" }
        );

        res.status(201).json({
          message: "connexion autorisé",
          token: token,
        });
      } else {
        res.status(403).json({ message: "accès refusé" });
      }
    } else {
      res.status(104).json({ message: "utilisateur inconnu" });
    }
  } catch (error) {
    res.status(500).json({ message: "erreur lors de la connexion", error });
    console.log(error);
  }
};

//récupération de son profil perso grâce au token
export const getProfile = async (req, res) => {
  // récupération de l'id de l'utilisateur à partir du token
  // le token est vérifié par le middleware checkToken
  const idUser = req.user.idUser;

  try {
    const [result] = await userModels.getProfileUser(idUser);

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: "utilisateur non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "erreur lors de la récupération du profil", error });
    console.log(error);
  }
};

export const getProfiles = async (req, res) => {
  // récupération du role de l'utilisateur à partir du token
  // le token est vérifié par le middleware checkToken
  const isAdmin = req.user.admin;

  // si il a rôle different soit 0 l'utilisateur ne peux pas y acceder
  if (isAdmin !== 1) {
    return res
      .status(403)
      .json({ message: "Accès interdit : réservé aux administrateurs" });
  }

  try {
    const [result] = await userModels.getAllProfile();

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "utilisateur non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "erreur lors de la récupération du profil", error });
    console.log(error);
  }
};

export const updateProfileUsername = async (req, res) => {
  // récupération de l'id de l'utilisateur à partir du token
  const userId = req.user.idUser;

  // récupération des informations à mettre à jour
  const {username} = req.body;

  try {

    const [currentUser] = await userModels.getProfileUser(userId);

    //vérification si le username est différent avant de faire la vérif
    if (currentUser.username !== username) {
      const [usernameExists] = await userModels.checkUsernameExists(username);
      if (usernameExists.length > 0) {
        return res
          .status(409)
          .json({ message: "Nom d'utilisateur déjà utilisé" });
      }
    }
    // utilisation de la connexion bdd pour executer la requete
    await userModels.updateUsername(username, userId);
    // envoi de la réponse
    res.status(200).json({ message: "pseudo mis à jour" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "erreur lors de la mise à jour du pseudo", error });
    console.log(error);
  }
};

export const updateProfileMail = async (req, res) => {
  // récupération de l'id de l'utilisateur à partir du token
  const userId = req.user.idUser;

  
  
  // récupération des informations à mettre à jour
  const {mail} = req.body;
  
  try {
      
      
    const [currentUser] = await userModels.getProfileUser(userId);

    //vérification si le username est différent avant de faire la vérif
    if (currentUser.mail !== mail) {
      const [usernameExists] = await userModels.checkMailExists(mail);
      if (usernameExists.length > 0) {
        return res
          .status(409)
          .json({ message: "Mail déjà utilisé" });
      }
    }
    // utilisation de la connexion bdd pour executer la requete
    await userModels.updateMail(mail, userId);
    // envoi de la réponse
    res.status(200).json({ message: "mail mis à jour" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "erreur lors de la mise à jour du mail", error });
    console.log(error);
  }
};

export const updatePassword = async (req, res) => {

    // récupération de l'id de l'utilisateur à partir du token
    const userId = req.user.idUser;
   
    // récupération des informations à mettre à jour
    const {oldPassword, newPassword} = req.body;

    try {
        // récupération de l'utilisateur pour vérifier l'ancien mot de passe
        const [result] = await userModels.getUserPassword(userId);


        if (result.length > 0) {
            const userData = result[0];

            
            
            // vérification de l'ancien mot de passe
            const checkOldPassword = await bcrypt.compare(oldPassword, userData.password);

            if (checkOldPassword) {
                // cryptage du nouveau mot de passe
                const cryptedNewPassword = await bcrypt.hashSync(newPassword, 10);
                // utilisation de la connexion bdd pour executer la requete
                await userModels.updateUserPassword(cryptedNewPassword, userId);
                res.status(200).json({message: "mot de passe mis à jour"});
            } else {
                res.status(403).json({message: "ancien mot de passe incorrect"});
            }
        } else {
            res.status(404).json({message: "utilisateur non trouvé"});
        }
        
    } catch (error) {
        res.status(500).json({message: "erreur lors de la mise à jour du mot de passe", error});
        console.log(error);
    }
}