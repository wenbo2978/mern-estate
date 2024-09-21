import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { addMessage, getChatUserList, getMessageList, getMessage } from '../controllers/message-controller.js';

const router = express.Router();

router.post('/add', verifyToken, addMessage);
router.get('/getUserChatList/:id', verifyToken, getChatUserList);
router.get('/getMessageList/:userChatRef', verifyToken, getMessageList);
router.get('/getMessage/:id', verifyToken, getMessage);

export default router;