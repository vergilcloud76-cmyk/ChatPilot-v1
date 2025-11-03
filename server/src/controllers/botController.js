import TelegramBot from "node-telegram-bot-api";

export function initBots() {
  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

  bot.on("message", (msg) => {
    bot.sendMessage(msg.chat.id, "البوت شغال 🚀");
  });
}
