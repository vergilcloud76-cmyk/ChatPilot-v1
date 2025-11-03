import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import mainRoute from "./src/routes/main.js";

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/", mainRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
