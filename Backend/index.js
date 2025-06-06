import dotenv from "dotenv";
import express, { json } from "express";

import cors from "cors";
import analyzeRoutes from "./Routes/analyzeRoutes.js"


dotenv.config();

const app = express();
const port = 9000 || process.env.PORT;


app.use(cors());

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Home Page Route");
})


app.use("/api/v1/analyze",analyzeRoutes)
app.listen(port,()=>{
    console.log( `sever is running on port ${port}`)
    
});
