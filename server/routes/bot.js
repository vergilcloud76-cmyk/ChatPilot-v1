import express from 'express';
import { handleMessage } from '../controllers/botController.js';

const router = express.Router();

router.post('/message', handleMessage);

export default router;
