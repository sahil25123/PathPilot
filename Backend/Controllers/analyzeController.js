 import multer from "multer"
 
 
 export const  analyzer = (req, res) =>{
    res.send("Analyzer")
}




 export const handleResumeAnalyzer = (req,res) =>{
    try{
        const file = req.file;
        const jobDesc= req.jobDesc;

        res.json(file , jobDesc);
       
        res.status(200).json({message:"Parsing"})


    }
    catch(e){
        res.status(500).json({message :"Internal Server Error"})
    }

}

