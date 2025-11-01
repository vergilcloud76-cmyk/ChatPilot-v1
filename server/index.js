import 'dotenv/config';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const merchantRoutes = require('./routes/merchant');
const webhookRoutes = require('./routes/webhook');
const adminRoutes = require('./routes/admin');
const botRoutes = require('./routes/bot');

const { MONGO_URI } = require('./config/env');

const app = express();
app.use(bodyParser.json());

// اتصال بقاعدة البيانات
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/admin', adminRoutes);
app.use('/webhook/telegram', webhookRoutes);
app.use('/api/bot', botRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
