import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import studentRouter from "./routes/student.routes.js";
import * as dotenv from "dotenv";
dotenv.config();
const { MONGO_ATLAS_PASSWORD } = process.env;

const app = express();

mongoose
  .connect(
    `mongodb+srv://fran27dev:${MONGO_ATLAS_PASSWORD}@codercluster.p2becio.mongodb.net/AggregationPipeline_2?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to DB");
  });

app.use(express.static(__dirname + "/../public"));
app.use("/api/students", studentRouter);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.listen(8080, () => {
  console.log("Server listening no port 8080");
});
