const axios = require('axios');
const { getReply } = require('./openai');

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function handleTelegramMessage(message) {
    const chatId = message.chat.id;
    const text = message.text;

    const replyText = await getReply(text);

    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: replyText
    });
}

module.exports = { handleTelegramMessage };
