const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function generateAIResponse(userMessage) {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: userMessage }]
  });
  return response.data.choices[0].message.content;
}
module.exports = { generateAIResponse };

