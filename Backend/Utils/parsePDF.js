import { Buffer } from 'buffer';

export const parsePDF = async (buffer) => {


    try {
        const { default: pdf } = await import('pdf-parse');
        const data = await pdf(Buffer.from(buffer));
        return data.text;
        
    
        
        return data.text.trim();
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error(`Failed to parse PDF: ${error.message}`);
    }
};

// Note: Removed default export to avoid confusion, using named export only
export default parsePDF;
