import botService from "../services/botService.js";

export const getBotStatus = async (req, res) => {
  try {
    const status = botService.getStatus();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const runBotTask = async (req, res) => {
  try {
    const result = await botService.runTask(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
