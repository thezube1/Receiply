const express = require("express");
const app = express();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.get("/api/invite/:familyID", (req, res) => {
  const encoded = req.params.familyID;
  jwt.verify(encoded, process.env.ACCESS_TOKEN_KEY, (err, family) => {
    if (err) {
      res.send(false);
      res.end();
    } else {
      jwt.verify(
        req.cookies.userAuth,
        process.env.ACCESS_TOKEN_KEY,
        (err, result) => {
          connection.query(
            `SELECT FAMILY FROM Accounts WHERE USER_ID='${result.user_id}'`,
            (err, check) => {
              if (err) {
                console.log(err);
              }
              if (check[0].FAMILY === null || check[0].FAMILY === undefined) {
                console.log("Allowed to add family");
                connection.query(
                  `UPDATE Receiply.accounts SET FAMILY = '${family.family}' WHERE USER_ID= '${result.user_id}'`,
                  (err, response) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log(response);
                  }
                );
              } else {
                console.log("Already apart of a family!");
                res.send(false);
              }
            }
          );
        }
      );
    }
  });
});

app.get("/api/createinvite", (req, res) => {
  const token = req.cookies.userAuth;
  if (!token) return res.status(200).send(false);
  jwt.verify(
    req.cookies.userAuth,
    process.env.ACCESS_TOKEN_KEY,
    (err, result) => {
      if (err) return res.status(500).send(false);
      if (result.auth === true) {
        connection.query(
          `SELECT FAMILY from Accounts WHERE USER_ID='${result.user_id}'`,
          (err, data) => {
            const family_id = data[0].FAMILY;
            const payload = { family: family_id };
            jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, (err, token) => {
              res.send(token);
              res.end();
            });
          }
        );
      }
    }
  );
});

module.exports = app;
