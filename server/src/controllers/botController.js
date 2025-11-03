import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

let bot = null; // منع تشغيل البوت مرتين

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

  // welcome /start
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🔥 أهلا بيك في ChatPilot Bot!\nاكتب أي شيء وبنرد عليك 😉");
  });

  // reply to any text
  bot.on("message", (msg) => {
    if (msg.text === "/start") return;
    bot.sendMessage(msg.chat.id, `📩 استلمت رسالتك:\n"${msg.text}"`);
  });

  return bot;
}
