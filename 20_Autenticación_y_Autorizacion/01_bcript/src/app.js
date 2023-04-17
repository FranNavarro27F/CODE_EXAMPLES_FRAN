import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";

import { __dirname } from "./utils.js";
import { AuthRouter } from "./routes/auth.routes.js";
import { WebRouter } from "./routes/web.routes.js";
import mongoose from "mongoose";

// console.log(path.join(__dirname,"/views"));

const app = express();
const port = 8080;
const database = `mongodb+srv://fran27dev:6dbqHHJOPrk8FJjo@codercluster.p2becio.mongodb.net/20_Autent_autoriz_bcrypt?retryWrites=true&w=majority`;

mongoose.connect(database);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion de la sesion
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: database,
    }),
    secret: "claveSecreta",
    resave: true,
    saveUninitialized: true,
  })
);

//confifuracion de handlebars
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

//routes
app.use(WebRouter);
app.use("/api/sessions", AuthRouter);

app.listen(port, () => console.log(`Server on port ${port}`));
