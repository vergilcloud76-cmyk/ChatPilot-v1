import { Router } from "express";
import TelegramBot from "node-telegram-bot-api";

const router = Router();

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

// لازم Webhook URL يكون عنوان السيرفر + /bot + التوكن
const webhookUrl = `${process.env.SERVER_URL}/bot${token}`;
bot.setWebHook(webhookUrl);

// استقبال الرسائل
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    // مثال: الرد برسالة
    bot.sendMessage(chatId, "البوت شغال 🚀");
});

// ربط Express مع Telegram Webhook
router.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

export default router;
