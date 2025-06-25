import { Buffer } from 'buffer';

export const parsePDF = async (buffer) => {
    try {
        const { default: pdf } = await import('pdf-parse');
        const data = await pdf(Buffer.from(buffer));
        return data.text;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF file');
    }
};

export default parsePDF;
