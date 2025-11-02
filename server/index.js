import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import mainRoutes from './routes/main.js';
import { connectDB } from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// حماية HTTP headers
app.use(helmet());

// Logging
app.use(morgan('combined'));

// تحليل JSON
app.use(express.json());

// الاتصال بقاعدة البيانات
connectDB();

// استخدام Route الرئيسي
app.use('/', mainRoutes);

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
