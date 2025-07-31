import express from 'express';
import checkToken from '../middleware/checkToken.js';
import { addFavorite } from '../controllers/favoriteControllers.js';

const router = express.Router();

router.post('/addfavorite',checkToken, addFavorite);

export default router;