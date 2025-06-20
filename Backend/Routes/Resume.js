import express from "express";

const router = express.Router();



router.get("/", (req,res) =>{
    res.send("Resume Upload page")
})
router.post("/" , Resume)

export default router;