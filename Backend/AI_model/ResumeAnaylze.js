import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";


dotenv.config();
console.log(process.env.GEMINI_API_KEY);
console.log(process.env.PORT);


const ai = new GoogleGenAI({apiKey: "AIzaSyDchu-LpGGBe-770wfy58ex_fxhdycWsaU"});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();