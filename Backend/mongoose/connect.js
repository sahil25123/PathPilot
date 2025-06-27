import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const connectMongo=() =>{ mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to PathPolit Database")
})
.catch((err)=>{
    console.log("An Error occured in the connection" , err)

})
}

export default connectMongo;
