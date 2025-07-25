import express from "express";
import { analyzer, handleResumeAnalyzer } from "../Controllers/analyzeController.js";
import { upload } from "../Controllers/Resume.js";


const router = express.Router();

// Test route
router.get("/", analyzer);

// Route to analyze resume with job description
router.post("/", 
    upload.single("resume"),  
    handleResumeAnalyzer    
);

export default router;