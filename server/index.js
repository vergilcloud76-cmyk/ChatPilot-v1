import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import apiRoutes from "./src/routes/api.js";
import initBot from "./src/controllers/botController.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database
connectDB();

// Init Telegram Bot
initBot();

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT} 🚀`));
