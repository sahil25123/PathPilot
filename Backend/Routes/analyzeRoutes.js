import express from "express";
import { analyzer, handleResumeAnalyzer } from "../Controllers/analyzeController.js";
import { upload } from "../Controllers/Resume.js";
import { requireAuth } from "./middleware/clerkAuth.js";

const router = express.Router();

// Test route
router.get("/", analyzer);

// Route to analyze resume with job description
router.post("/", 
    requireAuth,
    upload.single("resume"),  
    handleResumeAnalyzer    
);

export default router;