require("dotenv").config();
const fileUpload = require("express-fileupload");
const fs = require("fs");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(express.json());
app.use(fileUpload());
app.use(express.static(__dirname + "/../build"));
app.use(cookieParser());
const mongoose = require("mongoose");
const massive = require("massive");
const {
  get,
  post,
  put,
  deleteItem,
  getAssessmentsByStudent,
  getCompetenciesByStudent,
  getHTMLByStudent
} = require("./controller/controller");
const {
  login,
  registerUser,
  userInfo,
  logout
} = require("./controller/authController");
const {
  createCompanyContact,
  readCompanyContact
} = require("./controller/companyController");
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  CONNECTION_STRING_PHOENIX
} = process.env;

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
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => console.log(err));

massive(CONNECTION_STRING_PHOENIX)
  .then(db => {
    app.set("db", db);
    console.log("db connected");
  })
  .catch(err => console.log(err));

// top level middlewares

// auth

app.post("/api/register", registerUser);
app.post("/api/login", login);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);

// data endpoints
app.route("/api/students").get(get);
app.get("/api/students/assessments/:id", getAssessmentsByStudent);
app.get("/api/students/competencies/:id", getCompetenciesByStudent);
app.get("/api/students/html/:id", getHTMLByStudent);
app.post("/api/student/resume/:id", async (req, res, next) => {
  console.log(req.files.file.data);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline;filename="student_${req.params.id}.pdf";`
  });
  fs.writeFileSync(
    `./public/student_${req.params.id}.pdf`,
    req.files.file.data,
    "binary"
  );
  res.status(200).send(`/student_${req.params.id}.pdf`);
});

app.get("/api/student_resume", (req, res, next) => {
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="picture.png"'
  });
  const filestream = fs.createReadStream(
    __dirname + `/../public/student_${req.query.id}.pdf`
  );
  filestream.on("open", () => {
    filestream.pipe(res);
  });
});

app
  .route("/api/companies")
  .post(createCompanyContact)
  .get(readCompanyContact);

app
  .route("/api/:id")
  .put(put)
  .delete(deleteItem);

app.get("/api/auth/callback", (req, res, next) => {
  console.log(req);
  console.log("Cookies: ", req.cookies);
});

const port = SERVER_PORT;
app.listen(port, () => console.log(`server listening on ${port}`));
