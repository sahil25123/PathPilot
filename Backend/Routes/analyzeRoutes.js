import express from "express";
import multer from "multer";


import {analyzer ,handleResumeAnalyzer } from "../Controllers/analyzeController.js";


const storage = multer.diskStorage({
    destination :function (req , file , cb) {
        return cb (null , "./uploads");
    },
    filename :function (req ,file , cb){
        return cb(null , `${file.originalname}`)
    }
})


const upload = multer({ storage: storage});

const router = express.Router()

router.get("/",analyzer)

router.post("/",  upload.single("resume"), handleResumeAnalyzer)

export default router;