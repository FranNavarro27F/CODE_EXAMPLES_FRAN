import express from "express";
import session from "express-session";

const app = express();
app.use(
  session({
    secret: "mi-secreto",
    saveUninitialized: true,
    resave: true,
  })
);

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    return res.send(`Cantidad de visitas ${req.session.counter}`);
  }
  req.session.counter = 1;
  res.send("Bienvenido");
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
