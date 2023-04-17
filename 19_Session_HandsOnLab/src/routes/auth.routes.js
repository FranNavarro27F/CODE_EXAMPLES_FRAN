import { Router } from "express";
import { UserModel } from "../models/user.models.js";

const authRouter = Router();

//routes
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await UserModel.create({ email, password });
    console.log(req.session);
    req.session.user = newUser.email;

    res.redirect("/profile");
  } catch (e) {
    res.status(500).send({ status: "error", payload: e.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        return res.send("La session no se pudo cerrar");
        res.redirect("/");
      }
    });
  } catch (e) {
    res.status(500).send({ status: "error", payload: e.message });
  }
});

export { authRouter };
