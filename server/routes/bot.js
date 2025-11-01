import express from 'express';
import { handleBotRequest } from '../controllers/botController.js';

const router = express.Router();

router.post('/message', handleBotRequest);

export default router;
