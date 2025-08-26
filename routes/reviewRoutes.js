import express from 'express';
import checkToken from '../middleware/checkToken.js';
import { addReview, deleteReview, getReviewUsers, updateReview } from '../controllers/reviewControllers.js';

const router = express.Router();

router.post('/addReview',checkToken, addReview);

// avis + note moyenne
router.get('/reviewsplace/:placeId', getReviewUsers);

router.put('/updatereview/:idReview',checkToken, updateReview);

router.delete('/deletereview/:idReview', checkToken, deleteReview);

export default router;