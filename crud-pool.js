const mysql = require("mysql");

function readPool(pool, callback) {
  let sql = "select * from users";

  pool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    } else {
      conn.query(sql, function (err, result) {
        if (err) {
          throw err;
        } else {
          callback(result);
          conn.release();
        }
      });
    }
  });
}

function insertPool(pool, data, callback) {
  let sqlInsert = "insert into users (nombre, email) values(?, ?)";
  let sql = mysql.format(sqlInsert, [data.nombre, data.email]);

  pool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    } else {
      conn.query(sql, function (err, result) {
        if (err) {
          throw err;
        } else {
          callback(result);
          conn.release();
        }
      });
    }
  });
}

function updatePool(pool, data, callback) {
  let sqlUpdate = "update users set nombre=?, email=? where id=?";
  let sql = mysql.format(sqlUpdate, [data.nombre, data.email, data.id]);

  pool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    } else {
      conn.query(sql, function (err, result) {
        if (err) {
          throw err;
        } else {
          callback(result);
          conn.release();
        }
      });
    }
  });
}

function removePool(pool, data, callback) {
  let sqlRemove = "delete from users where id=?";
  let sql = mysql.format(sqlRemove, [data.id]);

  pool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    } else {
      conn.query(sql, function (err, result) {
        if (err) {
          throw err;
        } else {
          callback(result);
          conn.release();
        }
      });
    }
  });
}

module.exports = { readPool, insertPool, updatePool, removePool };
