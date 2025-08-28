import express from 'express';
import checkToken from '../middleware/checkToken.js';
import { addFavorite, deleteFavorite, getFavoriteUsers } from '../controllers/favoriteControllers.js';

const router = express.Router();

router.post('/addfavorite',checkToken, addFavorite);

router.get('/favorites',checkToken, getFavoriteUsers);

router.delete('/deletefavorite/:idPlace',checkToken, deleteFavorite);

export default router;