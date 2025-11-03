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

connectDB();
initBot(app);  // تمرير app للبوت

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT} 🚀`));
