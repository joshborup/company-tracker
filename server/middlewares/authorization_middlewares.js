module.exports = {
  adminCheck: (req, res, next) => {
    console.log("hit admin staffCheck");
    if (req.session.user && req.session.user.permissions.includes(2)) {
      next();
    } else {
      res.redirect("http://localhost:3000/");
    }
  },
  teachingStaffCheck: (req, res, next) => {
    console.log("hit teaching staffCheck", req.session.user);

    if (
      req.session.user &&
      req.session.user.permissions &&
      (req.session.user.permissions.includes(3) ||
        req.session.user.permissions.includes(4) ||
        req.session.user.permissions.includes(7) ||
        req.session.user.permissions.includes(8))
    ) {
      next();
    } else {
      res.redirect("http://localhost:3000/");
    }
  },
  salariedStaffCheck: (req, res, next) => {
    console.log("hit salaried staffCheck");
    if (
      req.session.user &&
      req.session.user.permissions &&
      (req.session.user.permissions.includes(4) ||
        req.session.user.permissions.includes(7) ||
        req.session.user.permissions.includes(8))
    ) {
      next();
    } else {
      res.redirect("http://localhost:3000/");
    }
  }
};
