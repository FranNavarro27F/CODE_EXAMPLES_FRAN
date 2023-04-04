import cookieParser from "cookie-parser";
import express from "express";

const app = express();
// app.use(cookieParser());
app.use(cookieParser("mi-secreto"));

const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

app.get("/set-cookie", (req, res, next) => {
  res
    .cookie("coder_cookie", "Esta es una coder cookie", {
      maxAge: thirtyDaysInMs,
    })
    .send("Cookie set!");
});

app.get("/get-cookies", (req, res, next) => {
  res.send(req.cookies);
});

app.get("/delete-cookie", (req, res, next) => {
  res.clearCookie("coder_cookie").send("cookie deleted");
});

app.get("/set-signed-cookies", (req, res, next) => {
  res
    .cookie("signed_cookie", "Esta es una cookie firmada!", {
      maxAge: thirtyDaysInMs,
      signed: true,
    })
    .send("Signed cookie set!");
});

app.get("/get-signed-cookies", (req, res, next) => {
  res.send(req.signedCookies);
});

app.listen(8080, () => {
  console.log("Server Listening on port 8080");
});
