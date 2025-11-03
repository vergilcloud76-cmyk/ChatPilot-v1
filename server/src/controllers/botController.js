import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

let bot = null;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const userConversations = new Map();

export default function initBot(app) {
  if (bot) return bot;

  const TOKEN = process.env.TELEGRAM_TOKEN;
  if (!TOKEN) {
    console.error("❌ TELEGRAM_TOKEN not found");
    return;
  }

  bot = new TelegramBot(TOKEN); // بدون polling
  const WEBHOOK_URL = `${process.env.SERVER_URL}/bot${TOKEN}`;
  
  bot.setWebHook(WEBHOOK_URL);
  console.log("🤖 Telegram Bot Webhook Started ✅");

  // استقبال الرسائل من Telegram
  app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  // رسالة /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "🔥 أهلا بيك في ChatPilot Bot!\nاكتب أي شيء وبنرد عليك 😉");
    userConversations.set(chatId, []);
  });

  // الرد على أي رسالة نصية
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;
    if (userMessage === "/start") return;
    if (!userConversations.has(chatId)) userConversations.set(chatId, []);
    const conversation = userConversations.get(chatId);
    conversation.push({ role: "user", content: userMessage });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });
      const reply = response.choices[0].message.content;
      conversation.push({ role: "assistant", content: reply });
      bot.sendMessage(chatId, reply);
    } catch (error) {
      console.error("❌ OpenAI error:", error.message);
      bot.sendMessage(chatId, "⚠️ حصل خطأ حاول مرة ثانية.");
    }
  });

  return bot;
}
