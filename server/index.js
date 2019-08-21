require("dotenv").config();
const fileUpload = require("express-fileupload");
const fs = require("fs");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(fileUpload());
app.use(express.static(__dirname + "/../build"));
app.use(cookieParser());
// const mongoose = require("mongoose");
const massive = require("massive");
const {
  adminCheck,
  salariedStaffCheck,
  teachingStaffCheck
} = require("./middlewares/authorization_middlewares");
const {
  get,
  post,
  put,
  deleteItem,
  getAssessmentsByStudent,
  getCompetenciesByStudent,
  getHTMLByStudent
} = require("./controller/controller");
const { userInfo, logout } = require("./controller/authController");
const {
  createCompanyContact,
  readCompanyContact,
  readCompanyContactById,
  createCompanyNote
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

massive(CONNECTION_STRING_PHOENIX)
  .then(db => {
    app.set("db", db);
    console.log("db connected");
  })
  .catch(err => console.log(err));

// top level middlewares

// auth
app.get("/api/auth/callback", (req, res, next) => {
  console.log(req.cookies);

  let { cookies } = req;
  const publicKey = fs.readFileSync(`${__dirname}/jwt_public_key`);
  if (cookies.jwtAuth)
    jwt.verify(cookies.jwtAuth, publicKey, (err, user) => {
      if (err) console.log("err", err);
      if (user) {
        let { id: devmtnId, email, first_name, last_name, roles } = user;
        console.log(user);
        let permissions;
        if (roles) {
          permissions = roles.map(elem => elem.id);
        }
        req.session.user = {
          id: devmtnId,
          email,
          name: first_name + " " + last_name,
          permissions
        };
      }
      console.log(req.session.user);
      console.log(req.headers.host.split(":")[0]);

      res.redirect(`http://${req.headers.host.split(":")[0]}:3000`);
    });
});

app.get("/api/user", userInfo);
app.get("/api/logout", logout);

// data endpoints
app.get("/api/students", teachingStaffCheck, get);
app.get("/api/students/assessments/:id", getAssessmentsByStudent);
app.get("/api/students/competencies/:id", getCompetenciesByStudent);
app.get("/api/students/html/:id", getHTMLByStudent);
app.post(
  "/api/student/resume/:id",
  salariedStaffCheck,
  async (req, res, next) => {
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
  }
);

app.get("/api/student_resume", salariedStaffCheck, (req, res, next) => {
  req.app
    .get("db")
    .query("SELECT name FROM students where id = $1", [req.query.id])
    .then(([student]) => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=${student.name} resume.pdf`
      });
      const filestream = fs.createReadStream(
        __dirname + `/../public/student_${req.query.id}.pdf`
      );
      filestream.on("open", () => {
        filestream.pipe(res);
      });
    });
});
app.use(salariedStaffCheck);
app
  .route("/api/companies")
  .post(createCompanyContact)
  .get(readCompanyContact);

app
  .route("/api/companies/:id")
  .get(readCompanyContactById)
  .post(createCompanyNote);

app.use("*", express.static(__dirname + "/../build"));

const port = SERVER_PORT;
app.listen(port, () => console.log(`server listening on ${port}`));
