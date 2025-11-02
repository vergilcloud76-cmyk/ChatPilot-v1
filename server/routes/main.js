import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const router = express.Router();

// إعداد CORS
router.use(cors({
  origin: '*', // أو حدد موقعك فقط
  methods: ['GET','POST','PUT','DELETE'],
}));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // دقيقة
  max: 60, // أقصى 60 طلب بالدقيقة
  message: { status: 'error', message: 'عدد الطلبات تجاوز الحد المسموح به' }
});
router.use(limiter);

// Middleware لتسجيل الطلبات
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// الصفحة الرئيسية
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'مرحبًا! هذه الصفحة الرئيسية من Route الاحترافي الخاص بي.',
    timestamp: new Date(),
    routes: ['/about', '/contact', '/api/data']
  });
});

// صفحة About
router.get('/about', (req, res) => {
  res.json({
    status: 'success',
    title: 'عن الموقع',
    description: 'نسخة احترافية من Route مع حماية وLogging وRate Limiter.'
  });
});

// صفحة Contact
router.get('/contact', (req, res) => {
  res.json({
    status: 'success',
    email: 'support@myapp.com',
    phone: '+218 945 507 030'
  });
});

// API بيانات تجريبية
router.get('/api/data', (req, res) => {
  const data = [
    { id: 1, name: 'منتج 1', price: 10 },
    { id: 2, name: 'منتج 2', price: 20 }
  ];
  res.json({
    status: 'success',
    count: data.length,
    data
  });
});

// أي Route غير موجود
router.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'الصفحة المطلوبة غير موجودة',
    path: req.originalUrl
  });
});

export default router;
