const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config/env');

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

async function generateResponse(prompt) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });
  return completion.choices[0].message.content;
}

module.exports = { generateResponse };
