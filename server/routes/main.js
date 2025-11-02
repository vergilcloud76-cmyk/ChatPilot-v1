import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDynamicData } from '../db.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// حماية CORS
router.use(cors({ origin: '*' }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // دقيقة
  max: 100,
  message: { status: 'error', message: 'عدد الطلبات تجاوز الحد المسموح' }
});
router.use(limiter);

// Logging
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// الصفحة الرئيسية (Front-end ديناميكية)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API لجلب بيانات ديناميكية من MongoDB
router.get('/api/data', async (req, res) => {
  try {
    const data = await getDynamicData(); // ترجع بيانات من DB
    res.json({ status: 'success', count: data.length, data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 404 لأي Route آخر
router.all('*', (req, res) => {
  res.status(404).json({ status: 'error', message: 'الصفحة غير موجودة', path: req.originalUrl });
});

export default router;
