const { generateResponse } = require('../ai/openaiService');

async function handleBotRequest(req, res) {
  const { prompt } = req.body;
  try {
    const response = await generateResponse(prompt);
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { handleBotRequest };
