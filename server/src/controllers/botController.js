import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// رسالة الترحيب بالأمر start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `👋 أهلا بيك في البوت!
اكتب أي شي وبنرد عليك 😎`);
});

// رد على أي رسالة نصية
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // تجاهل أمر /start لأنه فوق ردينا عليه
  if (text === "/start") return;

  bot.sendMessage(chatId, `📩 استلمت رسالتك:
"${text}"`);
});

export default bot;
