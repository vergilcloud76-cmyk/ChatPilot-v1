// integrations/telegram/bot.js
const { Telegraf } = require('telegraf');

// ضع هنا التوكن الخاص بالبوت من BotFather
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(botToken);

// رسالة الترحيب
bot.start((ctx) => ctx.reply('أهلاً! أنا بوت Telegram الخاص بالمشروع.'));

// الرد على أي رسالة نصية
bot.on('text', (ctx) => {
    ctx.reply(`لقد استلمت رسالتك: ${ctx.message.text}`);
});

// تشغيل البوت
bot.launch().then(() => {
    console.log('Telegram bot running...');
});

// للتأكد من إغلاق البوت بشكل آمن عند توقف السيرفر
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
