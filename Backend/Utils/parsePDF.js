import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

/**
 * Parses text content from a PDF buffer
 * @param {Buffer} fileBuffer - The PDF file buffer
 * @returns {Promise<string>} Extracted text from the PDF
 */
export const parsePDF = async (fileBuffer) => {
  try {
    const data = await pdf(fileBuffer);
    return data.text;
  } catch (err) {
    console.error("❌ Error parsing PDF:", err.message);
    throw err;
  }
};
