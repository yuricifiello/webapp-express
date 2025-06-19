const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yuricifiello",
  database: "movies_db",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Errore connessione al DB:", err);
  } else {
    console.log("Connesso al database MySQL");
  }
});

module.exports = connection;
