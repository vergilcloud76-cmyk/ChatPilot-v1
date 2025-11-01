import OpenAI from 'openai';
import { OPENAI_KEY } from '../config/env.js';

const openai = new OpenAI({ apiKey: OPENAI_KEY });

export const getAIResponse = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content;
};
