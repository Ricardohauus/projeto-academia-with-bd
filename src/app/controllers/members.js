const moment = require("moment")

module.exports = {
  index(req, res) {
    return res.render("../views/members/index")
  },
  create(req, res) {
    return res.render("members/create")
  },
  saveOrUpdate(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!")
      }
    }

    let { id, name, avatar_url, birth, gender, created_at, email, blood, weight, height } = req.body;

    return;
  },
  show(req, res) {
    const { id } = req.params
    return
  },
  edit(req, res) {
    const { id } = req.params
    return
    //return foundMember != null ? res.render("../views/members/create", { member }) : res.send("Não encontrou");
  },
  delete(req, res) {
    const { id } = req.body;
    return res.redirect(`/members`)
  },
}
