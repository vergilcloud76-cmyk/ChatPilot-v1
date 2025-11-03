import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import mainRoutes from "./src/routes/main.js";
import userRoutes from "./src/routes/users.js";
import botRoutes from "./src/routes/bot.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", mainRoutes);
app.use("/users", userRoutes);
app.use("/bot", botRoutes);

// Connect MongoDB
connectDB();

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));

