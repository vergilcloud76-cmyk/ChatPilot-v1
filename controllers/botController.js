import TelegramBot from "node-telegram-bot-api";
import { askAI } from "./aiController.js";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const reply = await askAI(text);
  bot.sendMessage(chatId, reply);
});

export default bot;

