const Instructor = require("../models/instructor")
const moment = require("moment");
module.exports = {
  index(req, res) {
    Instructor.all(function (instructors) {
      return res.render("instructors/index", { instructors })
    })
  },
  create(req, res) {
    return res.render("instructors/create")
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
      Instructor.create(req.body, function (id) {
        return res.redirect(`/instructors/${id}`)
      })
    } else {
      Instructor.update(req.body, function (id) {
        return res.redirect(`/instructors/${id}`)
      })
    }
  },
  show(req, res) {
    const { id } = req.params

    Instructor.find(id, function (instructor) {
      if (!instructor) return res.send("Instrutor não encontrado! :(")
      instructor.age = moment().diff(instructor.birth, 'years', false)
      instructor.gender === "M" ? "Masculino" : "Feminino";
      instructor.services = instructor.services.split(",");
      instructor.created_at = moment(instructor.created_at).format('L')
      return res.render("instructors/show", { instructor })
    })
  },
  edit(req, res) {
    const { id } = req.params
    Instructor.find(id, function (instructor) {
      instructor.birth = moment(instructor.birth).add(1, "d").format('YYYY-MM-DD')
      return instructor != null ? res.render("instructors/create", { instructor }) : res.send("Não encontrou");
    })
  },
  delete(req, res) {
    const { id } = req.body;
    Instructor.find(id, function (instructor) {
      instructor != null ? Instructor.delete(id) : res.send("Instrutor não existe")
    })
    return res.redirect(`/instructors`)
  },
}
