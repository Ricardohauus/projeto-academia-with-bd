const express = require('express')
const routes = express.Router()
const Instructors = require("./app/controllers/instructors")
const Members = require("./app/controllers/members")

routes.get("/", function (req, res) {
  res.redirect("/instructors")
})

/* Instructors Routes */
routes.get("/instructors/create", Instructors.create)
routes.get("/instructors", Instructors.index)
routes.get("/instructors/:id", Instructors.show)
routes.get("/instructors/edit/:id", Instructors.edit)
routes.post("/instructors", Instructors.saveOrUpdate)
routes.put("/instructors", Instructors.saveOrUpdate)
routes.delete("/instructors", Instructors.delete)

/* Members Routes */
routes.get("/members/create", Members.create)
routes.get("/members", Members.index)
routes.get("/members/:id", Members.show)
routes.get("/members/edit/:id", Members.edit)
routes.post("/members", Members.saveOrUpdate)
routes.put("/members", Members.saveOrUpdate)
routes.delete("/members", Members.delete)




module.exports = routes;