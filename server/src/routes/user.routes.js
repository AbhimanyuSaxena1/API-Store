import express from 'express';
import { getProfile } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

// PUBLIC ROUTE
router.get('/profile', isAuthenticated, getProfile);

export default router;
