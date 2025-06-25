import multer from 'multer';
import { uploadToCloudinary } from '../Config/cloudinary.js';

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
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Upload file to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, {
            filename_override: req.file.originalname,
            resource_type: 'auto'
        });

        // The result contains the Cloudinary URL and public_id
        const fileUrl = result.secure_url;
        const publicId = result.public_id;

        // Here you would typically save the fileUrl and publicId to your database
        // For example: await ResumeModel.create({ url: fileUrl, publicId });

        res.status(200).json({
            success: true,
            message: 'Resume uploaded to Cloudinary successfully',
            fileUrl,
            publicId
        });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to upload resume',
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};