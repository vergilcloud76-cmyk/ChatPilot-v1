import TelegramBot from "node-telegram-bot-api";
import Message from "../models/Message.js";
import { askAI } from "./aiController.js";
import axios from "axios";

export const initBots = (app) => {
  // Telegram
  const tgBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
  tgBot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    await Message.create({ platform: "telegram", chatId, text });
    const aiReply = await askAI({ body: { message: text } }, { json: (data) => data });
    tgBot.sendMessage(chatId, aiReply);
  });

  // WhatsApp webhook
  app.post("/webhook/whatsapp", async (req, res) => {
    const { from, body } = req.body;
    await Message.create({ platform: "whatsapp", chatId: from, text: body });
    const aiReply = await askAI({ body: { message: text } }, { json: (data) => data });
    await axios.post("https://api.whatsapp.com/sendMessage", {
      to: from,
      message: aiReply,
      api_key: process.env.WHATSAPP_API_KEY
    });
    res.sendStatus(200);
  });

  // Facebook webhook
  app.post("/webhook/facebook", async (req, res) => {
    const { sender, message } = req.body;
    await Message.create({ platform: "facebook", chatId: sender.id, text: message.text });
    const aiReply = await askAI({ body: { message: text } }, { json: (data) => data });
    await axios.post(`https://graph.facebook.com/v16.0/me/messages?access_token=${process.env.FACEBOOK_PAGE_TOKEN}`, {
      recipient: { id: sender.id },
      message: { text: aiReply }
    });
    res.sendStatus(200);
  });
};
