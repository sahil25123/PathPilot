import express from "express";
import { coverletter } from "../Controllers/AiCoverLetter.js";


const router = express.Router();


router.get("/",coverletter )

export default router;