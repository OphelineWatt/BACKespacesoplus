import express from 'express';
// import checkToken from '../middleware/checkToken.js';
import {login, register} from '../controllers/userControllers.js';

// création du router permettant de gérer les routes liées aux utilisateurs
const router = express.Router();


    // route d'inscription utilisateur avec appel de la fonction register
router.post('/register', register);

// route de connexion
router.post('/login', login);

export default router;