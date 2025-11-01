const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_API_KEY } = require('../config/env.js');

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateResponse(prompt) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return completion.data.choices[0].message.content;
}

module.exports = { generateResponse };
