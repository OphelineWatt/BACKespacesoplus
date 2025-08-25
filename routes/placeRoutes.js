import express from 'express';
import { addPlace, deletePlace, getAllPlaces, getPlacesByIdUser, updateStatusPlace } from '../controllers/placeControllers.js';
import checkToken from '../middleware/checkToken.js';

const router = express.Router();

// visualisation des lieux
router.get('/places', getAllPlaces);

router.post('/addplace',checkToken, addPlace);

//modification du statut du lieu lorsque tu es admin pour l'afficher ou non
router.put('/updatestatus/:idPlace',checkToken, updateStatusPlace);

router.delete('/deleteplace/:idPlace', checkToken, deletePlace);

// Visualisation de ces contributions
router.get('/contribution', checkToken,getPlacesByIdUser)

export default router;