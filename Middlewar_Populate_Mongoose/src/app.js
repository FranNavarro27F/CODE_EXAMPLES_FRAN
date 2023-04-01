import express from "express";
import mongoose from "mongoose";
import courseModel from "./models/course.model.js";
import studentModel from "./models/student.model.js";

import * as dotenv from "dotenv";
dotenv.config();
const { MONGO_ATLAS_PASSWORD } = process.env;

const app = express();
app.use(express.json());

const createStudent = async () => {
  await studentModel.create({
    first_name: "Ale",
    last_name: "Suarez",
    email: "ale@gmail.com",
    gender: "Male",
  });
};

const createCourse = async () => {
  await courseModel.create({
    title: "Programacion Backend",
    description: "Curso de programacion Backend",
    difficulty: 5,
    topics: ["Node.js", "Express", "MongoDB", "Mongoose", "fs"],
    professor: "Ale Suarez",
  });
};

const addCourseToStudent = async () => {
  const student = await studentModel.findById("64286f424c6152f8563b90b7");

  student.courses.push({ course: "64286f424c6152f8563b90b9" });
  await student.save();
};

app.listen(8080, () => {
  console.log("Server listen on port 8080");
});

const main = async () => {
  await mongoose.connect(
    `mongodb+srv://fran27dev:${MONGO_ATLAS_PASSWORD}@codercluster.p2becio.mongodb.net/populate?retryWrites=true&w=majority`
  );

  // await createStudent();
  // await createCourse();
  // await addCourseToStudent();

  // const student = await studentModel
  //   .findById("64286f424c6152f8563b90b7")
  //   .populate("courses.course");

  const student = await studentModel.findById("64286f424c6152f8563b90b7");

  console.log(JSON.stringify(student, null, "\t"));
  await mongoose.connection.close();
};

main();
