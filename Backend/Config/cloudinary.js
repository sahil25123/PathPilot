import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {Object} options - Additional upload options
 * @returns {Promise<Object>} The upload result from Cloudinary
 */
export const uploadToCloudinary = (fileBuffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'resumes',
                ...options
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                resolve(result);
            }
        );

        // Create a readable stream from buffer and pipe to Cloudinary
        const stream = Readable.from(fileBuffer);
        stream.pipe(uploadStream);
    });
};

/**
 * Deletes a file from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @returns {Promise<Object>} The deletion result
 */
export const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            throw new Error('No public ID provided for deletion');
        }
        const result = await cloudinary.uploader.destroy(publicId);
        return { success: result.result === 'ok', result };
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

export default cloudinary;