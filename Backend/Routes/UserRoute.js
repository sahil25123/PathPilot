import express, { Router } from "express";

 export const UserRoute = express.Router();

UserRoute.get("/" , (req, res) =>{
    res.send("THis is user Routes")
})



 
