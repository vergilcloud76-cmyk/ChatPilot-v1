import dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const OPENAI_KEY = process.env.OPENAI_KEY;
export const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
