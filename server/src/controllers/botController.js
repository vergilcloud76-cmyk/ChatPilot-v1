import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

let bot = null;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// تخزين المحادثات لكل مستخدم
const userConversations = new Map();

export default function initBot() {
  if (bot) {
    console.log("⚠️ Bot already running, skipping init...");
    return bot;
  }

  const TOKEN = process.env.TELEGRAM_TOKEN;
  if (!TOKEN) {
    console.error("❌ Error: TELEGRAM_TOKEN not found in .env");
    return;
  }

  bot = new TelegramBot(TOKEN, { polling: true });
  console.log("🤖 Telegram Bot Started ✅");

  // رسالة الترحيب /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "🔥 أهلا بيك في ChatPilot Bot!\nاكتب أي شيء وبنرد عليك 😉"
    );

    // تهيئة ذاكرة المستخدم
    userConversations.set(chatId, []);
  });

  // رد على أي رسالة نصية
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    if (userMessage === "/start") return;

    // تهيئة ذاكرة المستخدم إذا لم تكن موجودة
    if (!userConversations.has(chatId)) {
      userConversations.set(chatId, []);
    }

    // إضافة رسالة المستخدم إلى الذاكرة
    const conversation = userConversations.get(chatId);
    conversation.push({ role: "user", content: userMessage });

    try {
      // إرسال المحادثة كلها إلى OpenAI لإبقاء السياق
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });

      const reply = response.choices[0].message.content;

      // إضافة رد البوت إلى الذاكرة
      conversation.push({ role: "assistant", content: reply });

      bot.sendMessage(chatId, reply);
    } catch (error) {
      console.error("❌ Error from OpenAI:", error.message);
      bot.sendMessage(chatId, "⚠️ حصل خطأ حاول مرة ثانية.");
    }
  });

  return bot;
}
