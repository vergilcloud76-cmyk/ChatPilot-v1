export function initBots() {
    const token = process.env.TELEGRAM_TOKEN;
    const bot = new TelegramBot(token, { polling: true });

    bot.on("message", (msg) => {
        bot.sendMessage(msg.chat.id, "البوت شغال 🚀");
    });
}
