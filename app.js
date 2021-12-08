const mysql = require("mysql");

/* ------------------------------------------------------------------------------ */
/* -----------------------------mysql.createConnection--------------------------- */
/* ------------------------------------------------------------------------------ */
// conexion mediante 'Connection'
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mariadb",
  database: "empleado",
});

// prueba de conexion para 'connection'
connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Conexion 'connection' exitosa...");
  }
});

// haciendo una consulta 'connection'
connection.query("select * from users", function (err, result) {
  if (err) {
    throw err;
  } else {
    console.log(result);
    connection.end();
  }
});

/* ------------------------------------------------------------------------------ */
/* --------------------------------mysql.createPool------------------------------ */
/* ------------------------------------------------------------------------------ */
// Conexion mediante una 'pool'.
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mariadb",
  database: "empleado",
});

// Prueba de conexcion mediante una 'pool'
pool.getConnection(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Conexion 'pool' exitosa...");
  }
});

// haciendo una consulta con 'pool'
pool.getConnection(function (err, con) {
  if (err) {
    throw err;
  } else {
    con.query("select * from users", function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log(result);
        con.release(); // libera la conexion
      }
    });
  }
});
