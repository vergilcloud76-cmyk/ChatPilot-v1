import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export const generateAIResponse = async (userMessage) => {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: userMessage }]
  });
  return response.data.choices[0].message.content;
};
