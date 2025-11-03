import express from "express";
import dotenv from "dotenv";
import { initBots } from "./src/controllers/botController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// تشغيل البوت
initBots();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
