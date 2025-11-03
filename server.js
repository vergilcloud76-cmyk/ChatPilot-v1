import express from "express";
import { initBots } from "./src/controllers/botController.js";
initBots();

const app = express();
app.use(express.json());

// ضع توكن بوتك هنا
const token = "YOUR_TELEGRAM_BOT_TOKEN";
const bot = new TelegramBot(token);

// رابط الويب هوك الخاص بك على Render
const url = "https://your-app-name.onrender.com";
const webhookPath = `/bot${token}`;

bot.setWebHook(`${url}${webhookPath}`);

// استقبال التحديثات من Telegram
app.post(webhookPath, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// مثال على رسالة ترحيب
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "أهلا بيك! البوت جاهز ويعمل على Webhook ✅");
});

// أي رسالة عامة
bot.on("message", (msg) => {
    if (msg.text !== "/start") {
        bot.sendMessage(msg.chat.id, `وصلت رسالتك: ${msg.text}`);
    }
});

// تشغيل السيرفر على البورت
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
