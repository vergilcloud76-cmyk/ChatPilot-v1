import express from "express";
import { getBotStatus, runBotTask } from "../controllers/botController.js";

const router = express.Router();

router.get("/status", getBotStatus);
router.post("/run", runBotTask);

export default router;
