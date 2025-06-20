require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const docx = require('docx');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure file upload
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to extract text from PDF
async function extractTextFromPdf(buffer) {
    try {
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        throw new Error('Failed to parse PDF');
    }
}

// Helper function to extract text from DOCX
async function extractTextFromDocx(buffer) {
    try {
        const { extractRawText } = require('docx-text');
        return await extractRawText(buffer);
    } catch (error) {
        throw new Error('Failed to parse DOCX');
    }
}

// AI Service Integration (using OpenAI API)
async function generateCoverLetter(resumeText, jobDescription = '', tone = 'professional') {
    const OPENAI_API_KEY = process.env.GEMINI_API_KEY ;
    
    if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
    }

    const prompt = `
    Generate a ${tone} cover letter based on the following resume information:
    ${resumeText}
    
    ${jobDescription ? `Tailor it for this job description:\n${jobDescription}` : ''}
    
    The cover letter should:
    - Be 3-4 paragraphs
    - Highlight relevant skills and experiences
    - Show enthusiasm for the position
    - Include a professional closing
    `;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert career advisor who creates compelling, tailored cover letters."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API Error:', error.response?.data || error.message);
        throw new Error('Failed to generate cover letter');
    }
}

// API Endpoints
app.post('/api/generate', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        let resumeText;
        const fileBuffer = req.file.buffer;

        // Determine file type and extract text
        if (req.file.mimetype === 'application/pdf') {
            resumeText = await extractTextFromPdf(fileBuffer);
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            resumeText = await extractTextFromDocx(fileBuffer);
        } else {
            return res.status(400).json({ error: 'Unsupported file type' });
        }

        // Get optional parameters
        const jobDescription = req.body.jobDescription || '';
        const tone = req.body.tone || 'professional';

        // Generate cover letter
        const coverLetter = await generateCoverLetter(resumeText, jobDescription, tone);

        res.json({
            success: true,
            coverLetter,
            extractedResumeText: resumeText.substring(0, 500) + '...' // Return first 500 chars for reference
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});