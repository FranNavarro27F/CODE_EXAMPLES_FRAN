import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

//configuracion de la session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://fran27dev:6dbqHHJOPrk8FJjo@codercluster.p2becio.mongodb.net/DB_Session_mongo?retryWrites=true&w=majority",
      ttl: 30,
    }),
    secret: "claveSecreta",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/login", (req, res) => {
  try {
    req.session.user = "usuarioTesting";
    res.send("session iniciada");
  } catch (e) {
    res.status(500).send({ status: "error", payload: e.message });
  }
});

app.get("/privada", (req, res) => {
  try {
    if (req.session.user) {
      console.log(req.session);
      res.send("ruta privada");
    } else {
      res.send("no tienes acceso");
    }
  } catch (e) {
    res.status(500).send({ status: "error", payload: e.message });
  }
});

app.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});
