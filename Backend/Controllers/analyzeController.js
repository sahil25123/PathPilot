import parsePDF from "../Utils/parsePDF.js";
// import ResumeAnalyze from "../AI_model/ResumeAnaylze.js"

 
 export const  analyzer = (req, res) =>{
    res.send("Analyzer")
};

export const handleResumeAnalyzer = async (req, res) => {
  try {
    const file = req.file;
    const jobDesc = req.body.jobDesc;

    if (!file || !jobDesc) {
      return res.status(400).json({ message: "Resume and job description required." });
    }

    const resumeText = await parsePDF(file.path);
    // const aiFeedback = await ResumeAnalyze(resumeText, jobDesc);

    res.status(200).json({
      analysis: aiFeedback,
    });
  } catch (e) {
    console.error("Resume analysis failed:", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
