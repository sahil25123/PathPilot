import axios from 'axios';
import { uploadToCloudinary } from '../Config/cloudinary.js';
import { parsePDF } from '../Utils/parsePDF.js';
import ResumeAnalyzer from "../AI_model/ResumeAnaylze.js";

export const analyzer = (req, res) => {
    res.send("Analyzer");
};

export const handleResumeAnalyzer = async (req, res) => {
    try {
        const file = req.file;
        const jobDesc = req.body.jobDesc;

        if (!file || !jobDesc) {
            return res.status(400).json({ 
                success: false,
                message: "Resume and job description are required." 
            });
        }

        // Upload the file to Cloudinary first
        const result = await uploadToCloudinary(file.buffer, {
            filename_override: file.originalname,
            resource_type: 'auto'
        });

        // Get the PDF text content from Cloudinary URL
        const response = await axios.get(result.secure_url, { responseType: 'arraybuffer' });
        const resumeText = await parsePDF(Buffer.from(response.data));
        
        // Analyze the resume
        const aiFeedback = await ResumeAnalyzer(resumeText, jobDesc);

        res.status(200).json({
            success: true,
            analysis: aiFeedback,
            resumeUrl: result.secure_url,
            publicId: result.public_id
        });
    } catch (error) {
        console.error("Resume analysis failed:", error);
        res.status(500).json({ 
            success: false,
            message: error.message || "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
