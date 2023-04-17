import { Router } from "express";
import { UserModel } from "../models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

//rutas de autenticacion
router.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/failure-signup",
  }),
  async (req, res) => {
    try {
      res.send("Usuario registrado");
    } catch (e) {
      res.status(500).send({ status: "error", payload: e.message });
    }
  }
);

router.get("/failure-signup", (req, res) => {
  res.send("No fue posible registrar al usuario");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      //si existe el usuario verificar la constraseña
      if (isValidPassword(user, password)) {
        req.session.user = user.email;
        return res.redirect("/profile");
      }
    }
    //si no existe enviamos un mensaje de que no esta registrado.
    res.send(`Usuario no registrado <a href="/signup">registrarse</a>`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.logOut((error) => {
    if (error) return res.send("no se pudo cerrar la sesion");
    req.session.destroy((err) => {
      if (err) return res.send("no se pudo cerrar la session");
      res.send("sesion finalizada");
    });
  });
});

// router.post("/forgot", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email: email });
//     if (user) {
//       user.password = createHash(password);
//       const userUpdate = await UserModel.findOneAndUpdate(
//         { email: user.email },
//         user
//       );
//       res.send("constaseña actualizada");
//     } else {
//       res.send("El usuario no esta registrado");
//     }
//   } catch (e) {
//     res.send({ status: "error", payload: "Restore not found" });
//   }
// });

export { router as AuthRouter };
