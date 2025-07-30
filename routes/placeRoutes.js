import express from 'express';
import { addPlace, deletePlace, getAllPlaces, updateStatusPlace } from '../controllers/placeControllers.js';
import checkToken from '../middleware/checkToken.js';

const router = express.Router();

router.get('/places', getAllPlaces);

router.post('/addplace', addPlace);

router.put('/updatestatus/:idPlace',checkToken, updateStatusPlace);

router.delete('/deleteplace/:idPlace', checkToken, deletePlace);

export default router;