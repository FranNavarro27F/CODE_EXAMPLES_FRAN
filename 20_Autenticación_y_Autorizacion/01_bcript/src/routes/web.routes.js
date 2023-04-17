import {Router} from "express";

const router = Router();

{/* <a href="/">Home</a>
<a href="/login">Inicio sesion</a>
<a href="/signup">Registro</a>
<a href="/profile">Perfil</a> */}

//rutas de las vistas
router.get("/",(req,res)=>{
    res.render("home");
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.get("/signup",(req,res)=>{
    res.render("registro");
});

router.get("/profile",(req,res)=>{
    console.log(req.session);
    res.render("perfil");
});

export {router as WebRouter};