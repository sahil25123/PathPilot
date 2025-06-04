import fs from "fs";
import pdfParse from "pdf-parse";

const parsePDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
 res.json(data.text);
};

export default parsePDF;