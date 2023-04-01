import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.router.js";
const { MONGO_ATLAS_PASSWORD } = process.env;

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(8080, () => {
  console.log("Server listeng on port 8080");
});

mongoose
  .connect(
    `mongodb+srv://fran27dev:${MONGO_ATLAS_PASSWORD}@codercluster.p2becio.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to DB DBaaS");
  });
