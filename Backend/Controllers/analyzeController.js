 import multer from "multer"
import parsePDF from "../Utils/parsePDF.js";
 
 
 export const  analyzer = (req, res) =>{
    res.send("Analyzer")
}




 export const handleResumeAnalyzer = (req,res) =>{
    try{
        const file = req.file;
        const jobDesc= req.jobDesc;
        console.log(file.path);

        parsePDF(file.path);


       
        res.status(200).json({message:"Parsing"})


    }
    catch(e){
        res.status(500).json({message :"Internal Server Error"})
    }

}

