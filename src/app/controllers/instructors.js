const moment = require("moment")
const db = require("../../config/db")

module.exports = {
  index(req, res) {
    return res.render("../views/instructors/index")
  },
  create(req, res) {
    return res.render("instructors/create")
  },
  saveOrUpdate(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!")
      }
    }
    console.log(moment().calendar());


    let { id, avatar_url, name, services, gender, birth } = req.body;
    const query = `
      INSERT INTO instructors (
        avatar_url, name, services, gender, birth, created_at
      ) VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id
    `;
    const values = [
      avatar_url, name, services, gender, birth, moment().calendar()
    ]
    db.query(query, values, function (err, results) {
      if (err) return res.send("Database Error!");
      return res.redirect(`/instructors/${results.rows[0].id}`)
    })
  },
  show(req, res) {
    const { id } = req.params
    return
  },
  edit(req, res) {
    const { id } = req.params
    return
    //return foundInstructor != null ? res.render("../views/instructors/create", { instructor }) : res.send("Não encontrou");
  },
  delete(req, res) {
    const { id } = req.body;
    return res.redirect(`/instructors`)
  },
}
