import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import mainRoutes from './routes/main.js';
import { connectDB } from './db.js';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'server/public')));

// الاتصال بMongoDB
connectDB();

// استخدام Route الرئيسي
app.use('/', mainRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
