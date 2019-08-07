const User = require("../collections/user");
const bcrypt = require("bcrypt");

module.exports = {
  registerUser: async (req, res, next) => {
    const { email, username, password } = req.body;

    const salt = await bcrypt.genSalt(12).catch(err => console.log(err));
    const hashedPassword = await bcrypt
      .hash(password, salt)
      .catch(err => console.log(err));

    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    user.save(async err => {
      if (err) {
        res.status(400).send(err);
      } else {
        const authenticatedUser = await User.find({ username })
          .select({ username: 1, email: 1 })
          .catch(err => res.status(400).send("incorrect username/password"));
        req.session.user = authenticatedUser[0];
        res.status(200).send(req.session.user);
      }
    });
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.find({ username }).catch(err =>
      res.status(400).send("incorrect username/password")
    );
    if (user.length) {
      const passwordsMatch = await bcrypt
        .compare(password, user[0].password)
        .catch(err => res.status(400).send("incorrect username/password"));

      if (passwordsMatch) {
        const authenticatedUser = await User.find({ username })
          .select({ username: 1, email: 1 })
          .catch(err => res.status(400).send("incorrect username/password"));
        req.session.user = authenticatedUser[0];
        res.status(200).send(req.session.user);
      } else {
        res.status(400).send("incorrect username/password");
      }
    } else {
      res.status(400).send("incorrect username/password");
    }
  },

  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("logged out");
  }
};

// const jwt = require("jsonwebtoken");
// const fs = require("fs");
// const path = require("path");
// const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "../../public.key"));

// module.exports = {
//   logout: (req, res) => {
//     req.session.destroy();
//     res.end();
//   },
//   authCallback: (req, res) => {
//     console.log("hit");
//     // Get JWT with student ID in it.
//     // Be sure to check the signature of the JWT!
//     const token = req.query.token;
//     const userInfo = jwt.verify(token, PUBLIC_KEY);
//     const db = req.app.get("db");
//     const { id, first_name, last_name, email, roles } = userInfo;
//     const name = first_name + " " + last_name;

//     // this is for the test account to change the role to applicant
//     let student = userInfo.roles.map(role => {
//       if (role.role === "student") {
//         role.role = "applicant";
//       }
//       return role.role;
//     });

//     // let student = student.map(role => {
//     //     return role.role
//     // })

//     console.log(userInfo);

//     if (
//       student.includes("applicant") &&
//       !student.includes("admin") &&
//       !student.includes("mentor") &&
//       !student.includes("lead_mentor") &&
//       !student.includes("lecturer") &&
//       !student.includes("lead_lecturer")
//     ) {
//       db.find_student([email]).then(student => {
//         if (student.length) {
//           req.session.student = student[0];
//           const { id } = student[0];
//           db.get_student_attendance([+id]).then(studentAttendance => {
//             req.session.student.attendance = studentAttendance;
//           });
//         }
//         setTimeout(() => {
//           res.redirect("/student_profile");
//         }, 1000);
//       });
//     } else {
//       db.find_user([email])
//         .then(user => {
//           if (user.length) {
//             req.session.user = {
//               id: user[0].id,
//               sub: user[0].sub,
//               name: user[0].name,
//               position: user[0].position,
//               email: user[0].email,
//               assignedCohort: user[0].assigned_cohort
//             };

//             res.redirect("/competencies");
//           } else {
//             return db.read_invited_users().then(invited_user_list => {
//               //use filter to filter over invited_user_list and see if the registrants email matched any of the invited users
//               const invited_user = invited_user_list.filter(
//                 invited => invited.email === email
//               );

//               if (invited_user.length) {
//                 return db
//                   .create_user([
//                     id,
//                     name,
//                     invited_user[0].position,
//                     invited_user[0].email,
//                     invited_user[0].assigned_cohort
//                   ])
//                   .then(user => {
//                     req.session.user = {
//                       id: user[0].id,
//                       sub: user[0].sub,
//                       name: user[0].name,
//                       position: user[0].position,
//                       email: user[0].email,
//                       assignedCohort: user[0].assigned_cohort
//                     };
//                     res.redirect("/competencies");
//                   })
//                   .catch(err => {
//                     console.log(err);
//                     res
//                       .status(404)
//                       .send(`SQL error ${err.detail} error code: ${err.code}`);
//                   });
//               } else {
//                 res.status(400).send("You are not an invited user");
//               }
//             });
//           }
//         })
//         .catch(error => {
//           console.error("error with find_user", error);
//           res.status(500).send("Something went wrong on the server");
//         });
//     }
//   },
//   loginForward: (req, res) => {
//     const redirectUri = encodeURIComponent(
//       `http://${req.headers.host}/auth/devmtn/callback`
//     );
//     console.log(redirectUri);
//     const url = `https://devmountain.com/v2/auth/api/login?redirect_uri=${redirectUri}&client_id=${
//       process.env.DEVMTN_AUTH_CLIENT_ID
//     }`;
//     console.log(url);
//     res.redirect(url);
//   },
//   setUser: (req, res) => {
//     res.send(req.session.user);
//   }
// };
