import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let bot;

export function initBots() {
  if (!process.env.TELEGRAM_TOKEN) {
    console.error("EFATAL: Telegram Bot Token not provided!");
    return;
  }

  bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text) return;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: text }]
      });

      const reply = response.choices[0].message.content;
      bot.sendMessage(chatId, reply);
    } catch (error) {
      console.error("AI Error:", error);
      bot.sendMessage(chatId, "⚠️ حدث خطأ في معالجة الرسالة.");
    }
  });

  console.log("Telegram Bot with OpenAI started ✅");
}

export { bot };
