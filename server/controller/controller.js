module.exports = {
  get: (req, res, next) => {
    res.status(200).send("get live");
  },
  post: (req, res, next) => {
    res.status(200).send("post live");
  },
  put: (req, res, next) => {
    res.status(200).send("put live");
  },
  deleteItem: (req, res, next) => {
    res.status(200).send("deleteItem live");
  }
};
