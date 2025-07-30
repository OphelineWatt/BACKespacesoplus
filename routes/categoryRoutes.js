import express from 'express';
import { getAllCategory } from '../controllers/categoryControllers.js';

const router = express.Router();

router.get('/category', getAllCategory);

export default router;

