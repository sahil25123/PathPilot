import multer from 'multer';
import { uploadToCloudinary} from '../Config/cloudinary.js';
import Resume from "../models/Resume.js";
import {parsePDF} from '../Utils/parsePDF.js'; 

// Configure multer to use memory storage (we'll handle the file in memory)
const storage = multer.memoryStorage();

// Initialize multer with configuration
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

export const handleResumeUpload = async (req, res) => {
    
    try {
        const { userName, email, jobTitle, jobDescription } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Validate required fields
        if (!userName || !email || !jobTitle || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: userName, email, jobTitle, jobDescription'
            });
        }

        // Upload file to Cloudinary
        const Uploadresult = await uploadToCloudinary(file.buffer, {
            filename_override: file.originalname,
            resource_type: 'auto',
            folder: 'resumes'
        });
        const resumeText = await parsePDF(file.buffer);
        // Save to database
        const newResume = new Resume({
            userName,
            email,
            jobTitle,
            jobDescription,
            resumeUrl: Uploadresult.secure_url,
            resumeText,
            cloudinaryId: Uploadresult.public_id,
        });

        await newResume.save();

        res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: newResume,
    });


    } catch (error) {
    console.error("Resume upload failed:", error.message);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while processing the resume',
    });
  }
};