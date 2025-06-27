import { Buffer } from 'buffer';

/**
 * Parses a PDF buffer and returns the extracted text
 * @param {Buffer} buffer - PDF file buffer
 * @returns {Promise<string>} Extracted text from the PDF
 * @throws {Error} If PDF parsing fails or buffer is invalid
 */
export const parsePDF = async (buffer) => {
    if (!buffer || !(buffer instanceof Buffer) || buffer.length === 0) {
        throw new Error('Invalid PDF buffer provided');
    }

    try {
        const { default: pdf } = await import('pdf-parse');
        const data = await pdf(Buffer.from(buffer));
        
        if (!data || typeof data.text !== 'string') {
            throw new Error('Failed to extract text from PDF');
        }
        
        return data.text.trim();
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error(`Failed to parse PDF: ${error.message}`);
    }
};

// Note: Removed default export to avoid confusion, using named export only
