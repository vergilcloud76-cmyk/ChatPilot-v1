import express from 'express';
import { connectDB } from './db.js';
import myRoute from './routes/myRoute.js'; // تأكد من المسار الصحيح

const app = express();
const PORT = process.env.PORT || 10000;

connectDB();

// Middleware
app.use(express.json());

// ربط Route الرئيسي بالمحتوى
app.use('/', myRoute); // أي طلب إلى / سيذهب مباشرة للـ Route

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
