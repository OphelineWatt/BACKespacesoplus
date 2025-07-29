import express from 'express';
import checkToken from '../middleware/checkToken.js';
import {getProfile, getProfiles, login, register, updateProfileMail, updateProfileUsername} from '../controllers/userControllers.js';

// création du router permettant de gérer les routes liées aux utilisateurs
const router = express.Router();


// route d'inscription utilisateur avec appel de la fonction register
router.post('/register', register);

// route de connexion
router.post('/login', login);

// route de récupération des informations utilisateur
router.get('/profile', checkToken, getProfile);

// route de récupération de tous les utilisateurs si tu es admin
router.get('/allprofiles', checkToken, getProfiles);

// route de mise à jour du pseudo
router.put('/profile/updateUsername', checkToken, updateProfileUsername);

// route de mise à jour du mail
router.put('/profile/updateMail', checkToken, updateProfileMail);

export default router;