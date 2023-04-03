import { Router } from "express";
import studentModel from "../models/student.model.js";

const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const students = await studentModel.paginate(
      {},
      { limit: 5, lean: true, page: page ?? 1 }
    );

    res.render("students", { students });
  } catch (e) {
    res.status(500).send({ status: "error", payload: e.message });
  }
});

export default studentRouter;
