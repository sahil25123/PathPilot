import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const parsePDF = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return data.text; // ✅ Return the text, don't use res.json here
  } catch (err) {
    console.error("Error parsing PDF:", err.message);
    throw err;
  }
};

export default parsePDF;
