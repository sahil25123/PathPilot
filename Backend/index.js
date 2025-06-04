import express from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const port = 9000 || process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Home Page Route");
})
app.listen(port,()=>{
    console.log( `sever is running on port ${port}`)
});
