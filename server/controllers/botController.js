import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config/env.js';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export async function handleBotRequest(req, res) {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ response: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
