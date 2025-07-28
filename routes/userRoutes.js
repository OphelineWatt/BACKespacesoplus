import express from 'express';
import checkToken from '../middleware/checkToken.js';
import {getProfile, getProfiles, login, register} from '../controllers/userControllers.js';

// création du router permettant de gérer les routes liées aux utilisateurs
const router = express.Router();


    // route d'inscription utilisateur avec appel de la fonction register
router.post('/register', register);

// route de connexion
router.post('/login', login);

// route de récupération des informations utilisateur
router.get('/profile', checkToken, getProfile);

router.get('/allprofiles', checkToken, getProfiles)

export default router;