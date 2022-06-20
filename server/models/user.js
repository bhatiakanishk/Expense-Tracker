//taking the reference of mongoose:
import mongoose from "mongoose";

//here I am creating the schema 
const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  emailToken: { type: String},
  isVerified: {type: Boolean},
  date: { type: Date, default: Date.now()}
});

export default mongoose.model("Users", userSchema);