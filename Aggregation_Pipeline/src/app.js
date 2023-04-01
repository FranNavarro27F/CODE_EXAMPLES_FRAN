import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import orders from "./orders.js";
import students from "./students.js";
import orderModel from "./models/order.model.js";
import studentModel from "./models/student.model.js";

const { MONGO_ATLAS_PASSWORD } = process.env;

const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("Server listeng on port 8080");
});

const insertOrders = async () => {
  await orderModel.insertMany(orders);
};

const insertStudents = async () => {
  await studentModel.insertMany(students);
};

const main = async () => {
  await mongoose
    .connect(
      `mongodb+srv://fran27dev:${MONGO_ATLAS_PASSWORD}@codercluster.p2becio.mongodb.net/AggregationPipeline?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Connected to DB DBaaS");
    });

  await insertOrders();

  const orders = await orderModel.aggregate([
    { $match: { size: "medium" } },
    { $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } } },
    { $sort: { totalquantity: -1 } },
    { $group: { _id: 1, orders: { $push: "$$ROOT" } } },
    {
      $project: {
        _id: 0,
        orders: "$orders",
      },
    },
    { $merge: { into: "reports" } },
  ]);

  console.log(orders);

  await mongoose.connection.close();
};

// main();

const main2 = async () => {
  await mongoose
    .connect(
      `mongodb+srv://fran27dev:${MONGO_ATLAS_PASSWORD}@codercluster.p2becio.mongodb.net/AggregationPipeline_2?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Connected to DB DBaaS");
    });

  // await insertStudents();

  // -1- Obtener a los estudiantes ordenados por calificacion del mejor al peor.
  const resultOne = await studentModel.aggregate([{ $sort: { grade: -1 } }]);
  // console.log("one: ", resultOne);

  // -2- Obtener la cantidad de estudiantes agrupados por grupo.
  const resultTwo = await studentModel.aggregate([
    { $group: { _id: "$group", count: { $count: {} } } },
  ]);
  // console.log(resultTwo);

  // -3- Obtener el promedio de los estudiantes del grupo 1B.
  const resultThree = await studentModel.aggregate([
    { $match: { group: "1B" } },
    { $group: { _id: {}, avg: { $avg: "$grade" } } },
  ]);
  console.log(resultThree);

  // -4- Obtener el promedio de los estudiantes del grupo 1A.
  const resultFour = await studentModel.aggregate([
    { $match: { group: "1A" } },
    { $group: { _id: {}, avg: { $avg: "$grade" } } },
  ]);
  console.log(resultFour);

  // -5- Obtener el promedio general de los estudiantes.
  const resultFive = await studentModel.aggregate([
    { $group: { _id: {}, avg: { $avg: "$grade" } } },
  ]);
  console.log(resultFive);

  // -6- Obtener el promedio de calificaciones de los Hombres.
  const resultSix = await studentModel.aggregate([
    { $match: { gender: "Male" } },
    { $group: { _id: 0, avg: { $avg: "$grade" } } },
  ]);
  console.log(resultSix);

  // -7- Obtener el promedio de calificaciones de las Mujeres.
  const resultSeven = await studentModel.aggregate([
    { $match: { gender: "Female" } },
    { $group: { _id: 0, avg: { $avg: "$grade" } } },
  ]);
  console.log(resultSeven);

  await mongoose.connection.close();
};

main2();
