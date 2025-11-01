import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import merchantRoutes from './routes/merchant.js';
import webhookRoutes from './routes/webhook.js';
import adminRoutes from './routes/admin.js';
import botRoutes from './routes/bot.js';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/admin', adminRoutes);
app.use('/webhook/telegram', webhookRoutes);
app.use('/api/bot', botRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
