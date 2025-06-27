import mongoose from "mongoose";


const ResumeSchema = new mongoose.Schema({
   userName: String,
  email: String,
  jobTitle: String,
  jobDescription: String,
  resumeUrl: String,
  resumeText: String, // for saving the parsed text of resume 
  resumeText: String,
  cloudinaryId: String,
  createdAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model("Resume" , ResumeSchema);

export default Resume;

