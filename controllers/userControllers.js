import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userModels from "../models/userModels.js";
import {transporter, mailRegister, mailUpdateMail, mailUpdatePassword} from '../configuration/mail.js'

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

    //génération du mail de confirmation d'inscription
            transporter.sendMail(mailRegister(mail, username), (error, info) => {
            if (error) {
                return console.log("Erreur envoi mail :", error);
            }
            console.log("Mail envoyé :", info.response);
        });
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

        res.status(200).json({
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
    res.status(500).json({ message: "erreur lors de la connexion", erreur: error });
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
  const userId = req.user.idUser;
  const { mail } = req.body;

  try {
    const [currentUser] = await userModels.getProfileUser(userId);

    

    if (currentUser.mail !== mail) {
      const [usernameExists] = await userModels.checkMailExists(mail);
      if (usernameExists.length > 0) {
        return res.status(409).json({ message: "Mail déjà utilisé" });
      }
    }

    await userModels.updateMail(mail, userId);



    transporter.sendMail(mailUpdateMail(mail, currentUser[0].username), (error, info) => {
      if (error) {
        console.error("Erreur envoi mail :", error);
        return res.status(500).json({ message: "Erreur lors de l’envoi de l’email" });
      }

      console.log("Mail envoyé :", info.response);
      return res.status(200).json({ message: "Mail mis à jour et email envoyé" });
    });

  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({ message: "erreur lors de la mise à jour du mail", error });
  }
};

export const updatePassword = async (req, res) => {
  const userId = req.user.idUser;
  const { oldPassword, newPassword } = req.body;

  try {
    const [result] = await userModels.getUserPassword(userId);

    if (result.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const userData = result[0];
    const checkOldPassword = await bcrypt.compare(oldPassword, userData.password);

    if (!checkOldPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const cryptedNewPassword = await bcrypt.hash(newPassword, 10); // hashSync n’est pas async ;)
    await userModels.updateUserPassword(cryptedNewPassword, userId);

    // ✅ Envoi mail en async/await
    const info = await transporter.sendMail(
      mailUpdatePassword(userData.mail, userData.username)
    );
    console.log("Mail envoyé :", info.response);

    return res.status(200).json({ message: "Mot de passe mis à jour et mail envoyé" });

  } catch (error) {
    console.error("Erreur updatePassword:", error);
    return res.status(500).json({ message: "Erreur mise à jour mot de passe", error });
  }
};



export const deleteProfiles = async (req, res) => {
  // récupération du role de l'utilisateur à partir du token
  // le token est vérifié par le middleware checkToken
  const isAdmin = req.user.admin;

  const idUser = req.params.idUser

  // si il a rôle different soit 0 l'utilisateur ne peux pas y acceder
  if (isAdmin !== 1) {
    return res
      .status(403)
      .json({ message: "Accès interdit : réservé aux administrateurs" });
  }

  try {
    
    await userModels.deleteUserByAdmin(idUser);

    console.log(req.params);
    
    
      res.status(200).json({message: "profil suprimé"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "erreur lors de la supression du profil", error });
    console.log(error);
  }
};

export const deleteProfile = async (req, res) => {
  // récupération de l'id de l'utilisateur à partir du token
  // le token est vérifié par le middleware checkToken
  const idUser = req.user.idUser;

  try {
     await userModels.deleteAccount(idUser);

    
      res.status(200).json({message: "compte supprimé avec succès"});
   
  } catch (error) {
    res
      .status(500)
      .json({ message: "erreur lors de la récupération du profil", error });
    console.log(error);
  }
};