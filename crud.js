const mysql = require("mysql");

function read(connection, callback) {
  let sql = "select * from users";
  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      callback(result);
      // connection.end();
    }
  });
}

function insert(connection, data, callback) {
  let sqlInsert = "insert into users (nombre, email) values(?, ?)";
  let sql = mysql.format(sqlInsert, [data.nombre, data.email]);

  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      callback(result);
      // connection.end();
    }
  });
}

function update(connection, data, callback) {
  let sqlUpdate = "update users set email=? where id=?";
  let sql = mysql.format(sqlUpdate, [data.email, data.id]);

  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      callback(result);
      // connection.end();
    }
  });
}

function remove(connection, data, callback) {
  let sqlRemove = "delete from users where id=?";
  let sql = mysql.format(sqlRemove, [data.id]);

  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      callback(result);
      // connection.end();
    }
  });
}

module.exports = { read, insert, update, remove };
