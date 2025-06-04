import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const ResumeAnalyzer = async (resumeText, jobDescription) => {
  const prompt = `
You are a professional resume and ATS optimization assistant.

Given the resume and the job description below, perform the following:

1. Identify skill gaps between the resume and the job description.
2. Suggest missing keywords that should be added to match the job.
3. Highlight formatting or phrasing issues in the resume.
4. Suggest a score from 0 to 100 for the resume's relevance to the job.
5. Provide a short summary of what could be improved.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // or use "gpt-3.5-turbo" if needed
    messages: [
      { role: "system", content: "You are an expert resume screening assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};
