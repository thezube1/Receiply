const express = require("express");
const app = express();
const sql = require("mssql");

require("dotenv").config();
const PORT = 8080;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

sql.on("error", (err) => {
  console.log(err);
});

InsertAccount = () => {
  sql.connect(dbConfig, (err) => {
    if (err) console.log(err);

    let request = new sql.Request();
    request.query(
      "INSERT INTO Accounts VALUES (NEWID(), 'zubin.hydrie@hotmail.com', 'thezube', 'LetMeIn1234')",
      (err, data) => {
        if (err) console.log(err);
        console.log(data);
      }
    );
  });
};

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
