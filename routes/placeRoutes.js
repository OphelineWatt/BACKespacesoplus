import express from 'express';
import { addPlace, getAllPlaces } from '../controllers/placeControllers.js';

const router = express.Router();

router.get('/places', getAllPlaces);

router.post('/addplace', addPlace);

export default router;