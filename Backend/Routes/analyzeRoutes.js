import express from "express";
import { upload } from "../Controllers/Resume.js";
import { analyzer, handleResumeAnalyzer } from "../Controllers/analyzeController.js";

const router = express.Router();

router.get("/", analyzer);

// Route to analyze resume with job description
router.post("/", upload.single("resume"), handleResumeAnalyzer);

export default router;