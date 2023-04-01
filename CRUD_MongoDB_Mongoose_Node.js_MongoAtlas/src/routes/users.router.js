import { Router } from "express";
import userModel from "../models/user.model.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send({ status: "ok", payload: users });
});

userRouter.post("/", async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const createdUser = await userModel.create({
      first_name,
      last_name,
      email,
    });
    res.status(201).send({ status: "ok", payload: createdUser });
  } catch (err) {
    res.status(500).send({ status: "error", payload: err.message });
  }
});

userRouter.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const updateUserData = req.body;
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      updateUserData,
      { new: true }
    );
    res.status(200).send({ status: "ok", payload: updatedUser });
  } catch (err) {
    res.status(500).send({ status: "error", payload: err.message });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await userModel.deleteOne({ _id: userId });
    res.status(200).send({ status: "ok", payload: result });
  } catch (err) {
    res.status(500).send({ status: "error", payload: err.message });
  }
});

export default userRouter;
