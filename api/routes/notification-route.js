import express from 'express'
import { createNotification, getNotification } from '../controllers/notification-controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/generateNotification', verifyToken, createNotification);
router.get('/getNotification/:id', verifyToken, getNotification);

export default router;