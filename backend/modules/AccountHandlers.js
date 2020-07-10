const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.post("/api/login", (req, res) => {
  const email = req.body.account[0];
  const pass = req.body.account[1];
  console.log("Initiating check!");

  connection.query(
    `SELECT EMAIL, PASS FROM Accounts WHERE EMAIL='${email}'`,
    (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data === undefined) {
        console.log("User does not exist!");
      } else {
        let userPassword = data[0].PASS;
        bcrypt.compare(pass, userPassword, (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result === true) {
            console.log("User authenticated!");
            res.send(true);
            res.end();
          } else {
            console.log("Incorrect password!");
            res.send(false);
            res.end();
          }
        });
      }
    }
  );
});

app.post("/api/adduser", (req, res) => {
  const email = req.body.account[0];
  const first = req.body.account[1];
  const last = req.body.account[2];
  const user = req.body.account[3];
  const pass = req.body.account[4];
  console.log("Check!");

 
  connection.query(
    `SELECT EMAIL, PASS FROM Accounts WHERE EMAIL='${email}'`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data[0] === undefined) {
          bcrypt.hash(pass, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
            if (err) console.log(err);
            const hashPass = String(hash);
            connection.query(
              `INSERT INTO Accounts VALUES (UUID(), '${email}', '${user}', '${hashPass}', '${first}', '${last}')`,
              (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  connection.end();
                  console.log("Success!");
                }
              }
            );
          });
        } else {
          console.log("Account with email has already been created!");
        }
      }
    }
  );
});

module.exports = app;
