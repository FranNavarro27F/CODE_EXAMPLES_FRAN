import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  courses: {
    type: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "courses",
        },
      },
    ],
    default: [],
  },
});

// En este nivel se pueden agregar los Middlewares se Mongoose, (despues del schema y antes del modelo);
studentSchema.pre("findOne", function () {
  this.populate("courses.course");
});

const studentModel = mongoose.model("students", studentSchema);

export default studentModel;
