const Member = require("../models/member")
const moment = require("moment");
module.exports = {
  index(req, res) {
    Member.all(function (members) {
      return res.render("members/index", { members })
    })
  },
  create(req, res) {
    return res.render("members/create")
  },
  saveOrUpdate(req, res) {

    const keys = Object.keys(req.body)
    const { id } = req.body
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!")
      }
    }

    if (!id) {
      Member.create(req.body, function (id) {
        return res.redirect(`/members/${id}`)
      })
    } else {
      Member.update(req.body, function (id) {
        return res.redirect(`/members/${id}`)
      })
    }
  },
  show(req, res) {
    const { id } = req.params

    Member.find(id, function (member) {
      if (!member) return res.send("Instrutor não encontrado! :(")
      member.age = moment().diff(member.birth, 'years', false)
      member.gender === "M" ? "Masculino" : "Feminino";
      member.created_at = moment(member.created_at).format('L')
      return res.render("members/show", { member })
    })
  },
  edit(req, res) {
    const { id } = req.params
    Member.find(id, function (member) {
      member.birth = moment(member.birth).add(1, "d").format('YYYY-MM-DD')
      return member != null ? res.render("members/create", { member }) : res.send("Não encontrou");
    })
  },
  delete(req, res) {
    const { id } = req.body;
    Member.find(id, function (member) {
      member != null ? Member.delete(id) : res.send("Membro não existe")
    })
    return res.redirect(`/members`)
  },
}
