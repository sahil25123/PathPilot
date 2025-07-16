import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({

    clerkId: { type: String, required: true, unique: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User =  mongoose.model("User", UserSchema);

export default User; 

