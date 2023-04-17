import mongoose from "mongoose";

const usercollection = "users";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

export const UserModel = mongoose.model(usercollection, userSchema);
