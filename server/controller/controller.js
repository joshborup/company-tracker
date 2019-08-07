module.exports = {
  get: (req, res, next) => {
    const db = req.app.get("db");
    db.read.all_students().then(students => {
      res.status(200).send(students);
    });
  },
  getAssessmentsByStudent: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.read.assessments_by_student_id(id).then(student => {
      res.status(200).send(student);
    });
  },
  getCompetenciesByStudent: (req, res, next) => {
    console.log("hit");
    const { id } = req.params;
    console.log(id);
    const db = req.app.get("db");
    db.read.competencies_by_student_id(id).then(student => {
      console.log(student);
      res.status(200).send(student);
    });
  },
  getHTMLByStudent: (req, res, next) => {
    console.log("hit");
    const { id } = req.params;
    console.log(id);
    const db = req.app.get("db");
    db.read.html_by_student_id(id).then(student => {
      console.log(student);
      res.status(200).send(student);
    });
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
