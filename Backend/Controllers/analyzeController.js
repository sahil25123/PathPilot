
import parsePDF from "../Utils/parsePDF.js";
 
 
 export const  analyzer = (req, res) =>{
    res.send("Analyzer")
}

export const handleResumeAnalyzer = async (req, res) => {
  try {
    const file = req.file;
    const jobDesc = req.body.jobDesc;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumeText = await parsePDF(file.path);

    // Optional: delete the file after parsing
    // fs.unlinkSync(file.path);

    res.status(200).json({
      resumeText,
      jobDescription: jobDesc,
      message: "Resume parsed successfully",
    });
  } catch (e) {
    console.error("Resume parse failed:", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


