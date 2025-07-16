import express from "express";
import { upload, handleResumeUpload } from "../Controllers/Resume.js";


const router = express.Router();

router.post("/",upload.single('resume'), handleResumeUpload);

router.get("/", (req, res) => {
    res.send("Resume Upload API is running. Use POST / to upload a resume.");
});

export default router;