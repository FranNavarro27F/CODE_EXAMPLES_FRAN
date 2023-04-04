import cookieParser from "cookie-parser";
import express from "express";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("mi-secreto"));

app.get("/get-cookie", (req, res) => {
  res.send(req.cookies);
});

app.post("/set-cookie", (req, res) => {
  // const { "client-name": user, "client-email": email } = req.body;
  const user = req.body["client-name"];
  const email = req.body["client-email"];

  res.cookie(user, email, { maxAge: 10000 }).redirect("/");
});

app.listen(8080, () => {
  console.log("Server Listening on port 8080");
});
