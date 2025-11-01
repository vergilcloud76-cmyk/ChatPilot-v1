import { getAIResponse } from '../ai/openaiService.js';

export const handleMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await getAIResponse(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
