const axios = require('axios');
const OPENAI_KEY = process.env.OPENAI_API_KEY;

async function getReply(message) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{ role: "user", content: message }],
            temperature: 0.7
        }, {
            headers: { Authorization: `Bearer ${OPENAI_KEY}` }
        });

        return response.data.choices[0].message.content || "رد افتراضي";
    } catch (err) {
        console.log(err);
        return "حدث خطأ في توليد الرد";
    }
}

module.exports = { getReply };
