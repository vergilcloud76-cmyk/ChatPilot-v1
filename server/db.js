import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // يقرأ متغيرات البيئة من .env

const MONGO_URI = process.env.MONGO_URI; // تأكد من وضع الرابط في ملف .env

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error('MongoDB URI is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected ✅');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
