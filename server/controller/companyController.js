// -- company: "Mr."
// -- email: "joshborup@gmail.com"
// -- last_contact: "8/6/2019"
// -- name: "Joshua D Borup"
// -- notes: "Possible Deal"
// -- phone: "4803209766"
// -- photo: "https://avatars0.githubusercontent.com/u/17460334?s=460&v=4"
module.exports = {
  readCompanyContact(req, res, next) {
    const db = req.app.get("db");
    db.read.companies().then(companies => {
      res.status(200).send(companies);
    });
  },
  createCompanyContact(req, res, next) {
    const db = req.app.get("db");
    const {
      company,
      email,
      name,
      notes,
      last_contact,
      phone,
      photo
    } = req.body;
    db.insert
      .company([company, email, name, notes, last_contact, phone, photo])
      .then(companies => {
        res.status(200).send(companies);
      })
      .catch(err => console.log(err));
  }
};
