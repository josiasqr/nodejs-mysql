const express = require("express");
const app = express();
const mysql = require("mysql");

const { read, insert, update, remove } = require("./crud");
const { readPool, insertPool, removePool, updatePool } = require("./crud-pool");

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, function () {
  console.log("Server en puerto 3000");
});

/* ------------------------------------------------------------------------------ */
/* -----------------------------mysql.createConnection--------------------------- */
/* ------------------------------------------------------------------------------ */
/* conexion mediante 'mysql.createConnection' */
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mariadb",
  database: "empleado",
});

/* prueba de conexion para 'mysql.createConnection' */
connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Conexion 'connection' exitosa...");
  }
});

/* Rutas del 'CRUD' mediante 'mysql.createConnection'*/
app.get("/read", function (req, res) {
  read(connection, function (result) {
    res.json(result);
  });
});

app.get("/insert", function (req, res) {
  insert(
    connection,
    { nombre: "Pedro", email: "pedro@outlook.cl" },
    function (result) {
      res.json(result);
    }
  );
});

app.get("/update", function (req, res) {
  update(connection, { email: "psuarez@yahoo.com", id: 13 }, function (result) {
    res.json(result);
  });
});

app.get("/remove", function (req, res) {
  remove(connection, { id: 13 }, function (result) {
    res.json(result);
  });
});

/* */
/* haciendo una consulta 'mysql.createConnection' */
/*
connection.query("select * from users", function (err, result) {
  if (err) {
    throw err;
  } else {
    console.log(result);
    connection.end();
  }
});
*/

/* ------------------------------------------------------------------------------ */
/* --------------------------------mysql.createPool------------------------------ */
/* ------------------------------------------------------------------------------ */

/* conexion mediante 'mysql.createPool' */
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mariadb",
  database: "empleado",
});
/* prueba de conexion para 'mysql.createPool' */
pool.getConnection(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Conexion 'pool' exitosa...");
  }
});

/* Rutas del 'CRUD' mediante 'mysql.createPool'*/
app.get("/readPool", function (req, res) {
  readPool(pool, function (result) {
    res.json(result);
  });
});

app.get("/insertPool", function (req, res) {
  insertPool(
    pool,
    { nombre: "Adeline", email: "adeline@hotmail.com" },
    function (result) {
      res.json(result);
    }
  );
});

app.get("/updatePool", function (req, res) {
  updatePool(
    pool,
    { nombre: "Ana", email: "ana123@hotmail.com", id: 6 },
    function (result) {
      res.json(result);
    }
  );
});

app.get("/removePool", function (req, res) {
  removePool(pool, { id: 3 }, function (result) {
    res.json(result);
  });
});

/* */
/* haciendo una consulta con 'mysql.createPool' */
/*
pool.getConnection(function (err, conn) {
  if (err) {
    throw err;
  } else {
    conn.query("select * from users", function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log(result);
        conn.release(); // libera la conexion
      }
    });
  }
});
*/
