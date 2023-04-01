import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    index: true,
  },
  last_name: { type: String },
  email: { type: String },
  gender: { type: String },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
