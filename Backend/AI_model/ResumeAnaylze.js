import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from parent folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Initialize Gemini
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Main analyzer function
const ResumeAnalyzer = async (resumeText, jobDescription) => {
  try {
    const model =  "gemini-2.0-flash" 

    const prompt = `
You are a resume analysis assistant. Analyze the following resume based on the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Tasks:
1. Highlight any skill gaps.
2. Suggest improvements to phrasing or structure.
3. Provide an ATS optimization score out of 100.
4. Suggest relevant keywords to enhance resume visibility.
`;

    const response = await ai.models.generateContent({
    model: model,
    contents: prompt
  });
  // console.log(response.text);
  return response.text;
  } catch (err) {
    console.error("Gemini Error:", err.message);
    return null;
  }
};

export default ResumeAnalyzer;
