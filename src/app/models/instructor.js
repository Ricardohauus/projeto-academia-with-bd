const db = require("../../config/db")
const moment = require("moment");
module.exports = {
  all(callback) {
    db.query("SELECT * FROM instructors ORDER BY name", function (err, results) {
      if (err) throw "Database Error!" + err
      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
    INSERT INTO instructors (
      avatar_url, name, services, gender, birth, created_at
    ) VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING id
  `;
    const values = [
      data.avatar_url, data.name, data.services, data.gender, data.birth, moment().calendar()
    ]


    db.query(query, values, function (err, results) {
      if (err) throw "Database Error!" + err
      callback(results.rows[0].id)
    })
  },
  find(id, callback) {
    const query = `
    SELECT * FROM instructors where id = ${id}
  `;
    db.query(query, function (err, results) {
      if (err) throw "Database Error!" + err

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
      UPDATE instructors SET
        avatar_url = ($1), name = ($2), services = ($3), gender = ($4), birth = ($5) 
      WHERE ID = $6
      RETURNING id
      
  `;
    const values = [
      data.avatar_url, data.name, data.services, data.gender, data.birth, data.id
    ]

    db.query(query, values, function (err, results) {
      if (err) throw "Database Error!" + err
      callback(results.rows[0].id)
    })
  },
  delete(id) {
    const query = `
    DELETE FROM instructors where id = ${id}
  `;
    db.query(query, function (err, results) {
      if (err) throw "Database Error!" + err
      console.log(results);
    })
  },

}