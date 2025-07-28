import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModels from '../models/userModels.js';

dotenv.config();

// fonction d'inscription utilisateur
// cette fonction est appelée depuis le fichier userRoutes.js
export const register = async (req, res) => {


    
    // récupération des données du corps de la requête
    const {username, mail, password} = req.body;

    try {
        // cryptage du password
        const cryptedPassword = await bcrypt.hashSync(password, 10);

        // appel de la fonction addUser du modèle userModels
        // cette fonction permet d'insérer un nouvel utilisateur dans la base de données
        await userModels.addUser(username, mail, cryptedPassword)
        res.status(201).json({ message: "utilisateur créé"});
        
    } catch (error) {
        // gestion en cas d'erreur
        res.status(500).json({message: "erreur lors de l'inscription", error})
        
    }
}

export const login = async (req, res) => {
    const {mail, password} = req.body;
    try{

        
        // cette fonction permet de récupérer les données de l'utilisateur à partir de son mail
        const [result] = await userModels.loginUser(mail);

        const userData = result[0];

        if (result){

            const checkPassword = await bcrypt.compare(password, userData.password);
            
            if (checkPassword == true){

                // création du token
                const token = jwt.sign({idUser: userData.idUser, username: userData.username}, process.env.SECRET_KEY, {expiresIn: "6h"});

                res.status(201).json({
                    message: "connexion autorisé",
                    token: token
                });
            } else {
                res.status(403).json({message: "accès refusé"});
            }

        } else {
            res.status(104).json({message: "utilisateur inconnu"})
        }

    } catch (error) {

        res.status(500).json({message: "erreur lors de la connexion", error})
        console.log(error);

    }
}