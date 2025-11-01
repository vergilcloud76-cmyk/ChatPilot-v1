import { getAIResponse } from "../ai/openaiService.js";

export async function handleMessage(req, res) {
  const { prompt } = req.body;
  try {
    const response = await getAIResponse(prompt);
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
