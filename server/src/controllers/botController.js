import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

let botInstance = null;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// تخزين المحادثات لكل مستخدم
const userConversations = new Map();

export default function initBot(app) {
  if (botInstance) {
    console.log("⚠️ Bot already initialized.");
    return botInstance;
  }

  const TOKEN = process.env.TELEGRAM_TOKEN;
  const SERVER_URL = process.env.SERVER_URL;

  if (!TOKEN || !SERVER_URL) {
    console.error("❌ Missing Telegram Token or Server URL");
    return;
  }

  const webhookUrl = `${SERVER_URL}/bot${TOKEN}`;
  botInstance = new TelegramBot(TOKEN, { webHook: { port: process.env.PORT } });

  botInstance.setWebHook(webhookUrl).then(() => {
    console.log("✅ Webhook Set:", webhookUrl);
  }).catch(err => {
    console.error("❌ Webhook Error:", err.message);
  });

  // ⬅️ Express route to receive Telegram updates
  app.post(`/bot${TOKEN}`, (req, res) => {
    botInstance.processWebHook(req.body);
    res.sendStatus(200);
  });

  botInstance.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    botInstance.sendMessage(chatId, "🔥 أهلا بيك في ChatPilot Bot!\nاكتب أي شيء وبنرد عليك 😉");
    userConversations.set(chatId, []);
  });

  botInstance.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") return;

    if (!userConversations.has(chatId)) {
      userConversations.set(chatId, []);
    }

    const conversation = userConversations.get(chatId);
    conversation.push({ role: "user", content: text });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: conversation,
      });

      const reply = response.choices[0].message?.content || "⚠️ مافيش رد من AI";
      conversation.push({ role: "assistant", content: reply });

      botInstance.sendMessage(chatId, reply);
    } catch (err) {
      console.error("❌ OpenAI Error:", err.message);
      botInstance.sendMessage(chatId, "⚠️ حصل خطأ، حاول مرة ثانية.");
    }
  });

  return botInstance;
}
