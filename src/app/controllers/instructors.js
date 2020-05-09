const moment = require("moment")

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

    let { id, avatar_url, birth, name, services, gender } = req.body;

    return;
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
