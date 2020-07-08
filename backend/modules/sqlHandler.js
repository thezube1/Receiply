const express = require("express");
const app = express();
const sql = require("mssql");
const bcrypt = require("bcrypt");
require("dotenv").config();

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

app.post("/api/adduser", (req, res) => {
  const email = req.body.account[0];
  const first = req.body.account[1];
  const last = req.body.account[2];
  const user = req.body.account[3];
  const pass = req.body.account[4];
  console.log("Check!");
  sql.connect(dbConfig, (err) => {
    if (err) console.log(err);

    let request = new sql.Request();
    request.query(
      `SELECT email FROM Accounts WHERE email='${email}'`,
      (err, data) => {
        if (err) console.log(err);
        if (data.recordset === undefined || data.recordset.length == 0) {
          // All checks passed
          // Hash password
          bcrypt.hash(pass, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
            if (err) console.log(err);
            const hashPass = String(hash);
            // Send SQL
            console.log(hashPass.length);

            request.query(
              `INSERT INTO Accounts VALUES (NEWID(), '${email}', '${user}', '${hashPass}', '${first}', '${last}')`,
              (err, data) => {
                if (err) console.log(err);
                console.log("Success");
              }
            );
          });
        } else {
          console.log("Account with email already exists!");
        }
      }
    );
    /*
    
    */
  });
});

module.exports = app;
