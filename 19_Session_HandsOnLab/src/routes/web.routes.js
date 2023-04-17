import { Router } from "express";

const viewsRouter = Router();

//rutas de las vistas
viewsRouter.get("/", (req, res) => {
  res.render("home");
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/signup", (req, res) => {
  res.render("registro");
});

viewsRouter.get("/profile", (req, res) => {
  console.log("req.session:", req.session);
  res.render("perfil");
});

export { viewsRouter };
