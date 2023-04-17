import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { viewsRouter } from "./routes/web.routes.js";
import handlebars, { engine } from "express-handlebars";
import __dirname from "./utils.js";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const app = express();
const port = 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connection to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://fran27dev:6dbqHHJOPrk8FJjo@codercluster.p2becio.mongodb.net/Login_DB_Session_mongo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB DBaaS");
  });

//configuracion de session-mongo
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://fran27dev:6dbqHHJOPrk8FJjo@codercluster.p2becio.mongodb.net/Login_DB_Session_mongo?retryWrites=true&w=majority",
    }),
    secret: "claveSecreta",
    resave: true,
    saveUninitialized: true,
  })
);

// configuracion de handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
// app.set("view engine", ".hbs");
// app.set("view", path.join(__dirname + "./views"));

app.use("/", viewsRouter);
app.use("/api/sessions", authRouter);

app.listen(port, () => console.log(`Server listen on port ${port}`));
