import botService from "../services/botService.js";

export const getBotStatus = async (req, res) => {
  try {
    const status = botService.getStatus();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const runBotTask = async (req, res) => {
  try {
    const result = await botService.runTask(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  await saveMessage({ platform: 'telegram', chatId, text });

  // رد تلقائي باستخدام الذكاء الاصطناعي
  const aiResponse = await generateAIResponse(text);
  bot.sendMessage(chatId, aiResponse);
});
