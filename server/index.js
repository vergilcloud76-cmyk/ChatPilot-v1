import express from 'express';
import { connectDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// اتصل بقاعدة البيانات
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
