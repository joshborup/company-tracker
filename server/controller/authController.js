module.exports = {
  userInfo: (req, res, next) => {
    console.log(req.session.user);
    res.status(200).send(req.session.user);
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("logged out");
  }
};
