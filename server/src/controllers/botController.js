import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import OpenAI from "openai";
import fetch from "node-fetch"; // للتأكد من صحة URL

dotenv.config();

let bot = null;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// تخزين المحادثات لكل مستخدم
const userConversations = new Map();

export default async function initBot() {
  if (bot) {
    console.log("⚠️ Bot already running, skipping init...");
    return bot;
  }

  const TOKEN = process.env.TELEGRAM_TOKEN;
  const SERVER_URL = process.env.SERVER_URL;

  if (!TOKEN) {
    console.error("❌ TELEGRAM_TOKEN missing in .env");
    return;
  }
  if (!SERVER_URL) {
    console.error("❌ SERVER_URL missing in .env");
    return;
  }

  // التحقق من أن السيرفر URL يعمل
  try {
    await fetch(SERVER_URL);
  } catch (err) {
    console.error("❌ SERVER_URL is not reachable:", err.message);
    return;
  }

  bot = new TelegramBot(TOKEN);
  const webhookUrl = `${SERVER_URL}/bot${TOKEN}`;

  // ضبط Webhook
  try {
    await bot.setWebHook(webhookUrl);
    console.log("🤖 Telegram Bot Webhook Started ✅ at", webhookUrl);
  } catch (err) {
    console.error("❌ Failed to set webhook:", err.message);
    return;
  }

  // رسالة الترحيب /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "🔥 أهلا بيك في ChatPilot Bot!\nاكتب أي شيء وبنرد عليك 😉"
    );
    userConversations.set(chatId, []);
  });

  // الرد على أي رسالة نصية
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    if (userMessage === "/start") return;

    if (!userConversations.has(chatId)) {
      userConversations.set(chatId, []);
    }

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
      console.error("❌ Error from OpenAI:", error.message);
      bot.sendMessage(chatId, "⚠️ حصل خطأ حاول مرة ثانية.");
    }
  });

  return bot;
}
