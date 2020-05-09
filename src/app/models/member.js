const db = require("../../config/db")
const moment = require("moment");
module.exports = {
  all(callback) {
    db.query("SELECT * FROM members", function (err, results) {
      if (err) throw "Database Error!"
      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
    INSERT INTO members (
      name, avatar_url, birth, gender, created_at, email, blood, weight, height
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING id
  `;
    const values = [
      data.name, data.avatar_url, data.birth, data.gender, moment().calendar(), data.email, data.blood, data.weight, data.height
    ]


    db.query(query, values, function (err, results) {
      if (err) throw "Database Error!" + err
      callback(results.rows[0].id)
    })
  },
  find(id, callback) {
    const query = `
    SELECT * FROM members where id = ${id}
  `;
    db.query(query, function (err, results) {
      if (err) throw "Database Error!" + err

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
      UPDATE members SET
        name = ($1), avatar_url = ($2), birth = ($3), gender = ($4), email = ($5), blood =($6), weight = ($7), height = ($8)
      WHERE ID = $9
      RETURNING id
      
  `;
    const values = [
      data.name, data.avatar_url, data.birth, data.gender, data.email, data.blood, data.weight, data.height, data.id
    ]

    db.query(query, values, function (err, results) {
      if (err) throw "Database Error!" + err
      callback(results.rows[0].id)
    })
  },
  delete(id) {
    const query = `
    DELETE FROM members where id = ${id}
  `;
    db.query(query, function (err, results) {
      if (err) throw "Database Error!" + err
    })
  },

}