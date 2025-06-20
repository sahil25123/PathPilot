import mongoose from "mongoose";


const ResumeSchema = new mongoose.Schema({
    userName: String,
  email: String,
  jobTitle: String,
  resumeUrl: String,         // Cloudinary URL
  resumeText: String,        // Extracted from PDF
  jobDescription: String,
  createdAt: { type: Date, default: Date.now },
});
