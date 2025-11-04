import express from "express";
import Message from "../models/Message.js";
const router = express.Router();

// Get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error loading messages:", error.message);
    res.status(500).json({ error: "Server error loading messages" });
  }
});

export default router;
