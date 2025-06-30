import fs from "fs";
import { createRequire } from "module";
import { text } from "stream/consumers";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export const parsePDF = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    // console.log(data.text)
    return data.text; // ✅ Return the text, don't use res.json here
  } catch (err) {
    console.error("Error parsing PDF:", err.message);
    throw err;
  }
};

