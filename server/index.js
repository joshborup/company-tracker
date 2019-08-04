require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
app.use(express.json());
const mongoose = require("mongoose");
const { get, post, put, deleteItem } = require("./controller/controller");
const {
  login,
  registerUser,
  userInfo,
  logout
} = require("./controller/authController");
const { SERVER_PORT, CONNECTION_STRING_LOCAL, SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // 2 weeks
    }
  })
);

mongoose
  .connect(CONNECTION_STRING_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => console.log(err));

// top level middlewares

// auth

app.post("/api/register", registerUser);
app.post("/api/login", login);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);

// data endpoints
app
  .route("/api")
  .get(get)
  .post(post);

app
  .route("/api/:id")
  .put(put)
  .delete(deleteItem);

const port = SERVER_PORT;
app.listen(port, () => console.log(`server listening on ${port}`));
