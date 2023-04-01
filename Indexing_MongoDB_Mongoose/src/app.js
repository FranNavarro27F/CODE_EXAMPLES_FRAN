import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import userModel from "./models/user.model.js";
import __dirname from "./utils/dirname.js";
const { MONGO_ATLAS_PASSWORD } = process.env;

const app = express();
app.use(express.json());

const seetDataFromJson = async () => {
  let data = JSON.parse(fs.readFileSync(__dirname + "/../../Users.json"));
  const response = await userModel.insertMany(data);
  console.log(response);
};

// el .explain()  nos devuelve estadisticas sobre esa busqueda.
const queryData = async () => {
  const response = await userModel
    .find({ first_name: "Waylon" })
    .explain("executionStats");

  console.log(response.executionStats);
};

const main = async () => {
  await mongoose.connect(
    `mongodb+srv://fran27dev:${MONGO_ATLAS_PASSWORD}@codercluster.p2becio.mongodb.net/indexacion?retryWrites=true&w=majority`
  );
  //   await seetDataFromJson();
  await queryData();

  mongoose.connection.close();
};

main();

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
