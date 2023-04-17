import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
});

export const UserModel = mongoose.model(userCollection, userSchema);
