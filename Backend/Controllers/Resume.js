import multer from 'multer';
import { uploadToCloudinary, deleteFromCloudinary } from '../Config/cloudinary.js';
import Resume from "../models/Resume.js";
import { parsePDF } from '../Utils/parsePDF.js'; 

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
    let publicId = null;
    
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
        const result = await uploadToCloudinary(file.buffer, {
            filename_override: file.originalname,
            resource_type: 'auto',
            folder: 'resumes'
        });

        // Store publicId for cleanup in case of errors
        publicId = result.public_id;
        const fileUrl = result.secure_url;

        // Parse PDF content
        const resumeText = await parsePDF(file.buffer);
        
        // Save to database
        const newResume = new Resume({
            userName,
            email,
            jobTitle,
            jobDescription,
            resumeUrl: fileUrl,
            resumeText,
            cloudinaryId: publicId,
        });

        await newResume.save();

        return res.status(200).json({
            success: true,
            message: 'Resume uploaded and processed successfully',
            data: {
                fileUrl,
                publicId,
                resume: newResume
            }
        });

    } catch (error) {
        console.error('Error processing resume:', error);
        
        // Clean up uploaded file in Cloudinary if upload was successful but something else failed
        if (publicId) {
            try {
                console.log(`Cleaning up Cloudinary file: ${publicId}`);
                await deleteFromCloudinary(publicId);
            } catch (deleteError) {
                console.error('Error cleaning up Cloudinary file:', deleteError);
            }
        }
        
        const errorMessage = process.env.NODE_ENV === 'development' 
            ? error.message 
            : 'Failed to process resume. Please try again.';
            
        return res.status(500).json({
            success: false,
            message: errorMessage,
            ...(process.env.NODE_ENV === 'development' && { error: error.stack })
        });
    }
};