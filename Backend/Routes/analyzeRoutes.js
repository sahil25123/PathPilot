import express from "express";
import analyzeController from "../Controllers/analyzeController.js";



const router = express.Router()

router.get("/",analyzeController)
// router.post("/" , )

export default router;