module.exports = {
  readCompanyContact(req, res, next) {
    const db = req.app.get("db");
    db.read.companies().then(companies => {
      res.status(200).send(companies);
    });
  },
  createCompanyContact(req, res, next) {
    const db = req.app.get("db");
    let {
      company,
      email,
      name,
      notes,
      last_contact,
      phone,
      photo,
      technologies
    } = req.body;

    technologies = technologies.filter(tech => {
      return tech;
    });

    let formattedNote = {
      note: notes,
      timestamp: `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().toDateString()}`
    };

    db.insert
      .company([
        company,
        email,
        name,
        JSON.stringify([formattedNote]),
        last_contact,
        phone,
        photo,
        technologies
      ])
      .then(companies => {
        res.status(200).send(companies);
      })
      .catch(err => console.log(err));
  },
  readCompanyContactById(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    db.read.company_by_id(id).then(([company]) => {
      console.log(company);
      company.notes = company.notes.reverse();
      res.status(200).send(company);
    });
  },
  async createCompanyNote(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    const { note } = req.body;
    console.log(note, id);
    let formattedNote = {
      note: note,
      timestamp: `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().toDateString()}`
    };

    const [updatedCompanies] = await db.insert
      .note([JSON.stringify(formattedNote), id])
      .catch(err => console.log(err));
    updatedCompanies.notes = updatedCompanies.notes.reverse();
    res.status(200).send(updatedCompanies);
  }
};
