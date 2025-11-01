import 'dotenv/config';
import express from 'express';
import { connectDB } from './db.js';
import botRoutes from './routes/bot.js';

const app = express();
app.use(express.json());

connectDB();

app.use('/api/bot', botRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});
