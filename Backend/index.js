import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import analyzeRoutes from "./Routes/analyzeRoutes.js"
// import coverLetterRoute from "./Routes/coverLetterRoute.js";
import Resume from "./Routes/Resume.js"
import connectMongo from "./mongoose/connect.js";

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = 9000 || process.env.PORT;

connectMongo();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    // This makes req.auth available in all routes
    req.auth = ClerkExpressRequireAuth();
    next();
});

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

app.get("/",(req,res)=>{
    res.send("Home Page Route");
})

app.use("/api/v1/resume" ,Resume)
app.use("/api/v1/analyze",analyzeRoutes)
// app.use("/api/v1/coverletter" , coverLetterRoute)

app.use(errorHandler);


app.listen(port,()=>{
    console.log( `sever is running on port ${port}`)
    
});
