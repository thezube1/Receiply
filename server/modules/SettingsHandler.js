const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const validator = require("email-validator");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.use(cookieParser());

app.put("/api/user/username", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) throw err;
      connection.query(
        `SELECT USERNAME FROM Accounts WHERE USER_ID='${user.user_id}'`,
        (err, data) => {
          if (err) throw err;
          if (data[0].USERNAME === req.body.input) {
            res.send(false).end();
          } else {
            connection.query(
              `SELECT USERNAME FROM Accounts WHERE USERNAME='${req.body.input}'`,
              (err, data) => {
                if (err) throw err;
                if (data.length === 0) {
                  connection.query(
                    `UPDATE Accounts SET USERNAME='${req.body.input}' WHERE USER_ID='${user.user_id}'`,
                    (err, response) => {
                      if (err) throw err;
                      res.send(true).end();
                    }
                  );
                } else {
                  res.send("badUsername").end();
                }
              }
            );
          }
        }
      );
    });
    connection.release();
  });
});

app.put("/api/user/password", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) throw err;
      connection.query(
        `SELECT PASS FROM Accounts WHERE USER_ID='${user.user_id}'`,
        (err, data) => {
          if (err) throw err;
          const userPass = data[0].PASS;
          bcrypt.compare(req.body.input[0], userPass, (err, check) => {
            if (err) throw err;
            if (check === true) {
              bcrypt.compare(req.body.input[1], userPass, (err, check) => {
                if (err) throw err;
                if (check === true) {
                  res.send("passSame").end();
                } else {
                  bcrypt.hash(
                    req.body.input[1],
                    parseInt(process.env.SALT_ROUNDS),
                    (err, hash) => {
                      if (err) throw err;
                      connection.query(
                        `UPDATE Accounts SET PASS='${hash}' WHERE USER_ID='${user.user_id}'`,
                        (err, result) => {
                          if (err) throw err;
                          res.send(true).end();
                        }
                      );
                    }
                  );
                }
              });
            } else {
              res.send("badPass").end();
            }
          });
        }
      );
    });
    connection.release();
  });
});

app.put("/api/user/email", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    if (validator.validate(req.body.input) === true) {
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) throw err;
        connection.query(
          `SELECT EMAIL FROM Accounts WHERE USER_ID='${user.user_id}'`,
          (err, data) => {
            if (err) throw err;
            if (data[0].EMAIL === req.body.input) {
              res.send("usedEmail").end();
            } else {
              connection.query(
                `UPDATE Accounts SET EMAIL='${req.body.input}' WHERE USER_ID='${user.user_id}'`,
                (err, response) => {
                  if (err) throw err;
                  res.send(true).end();
                }
              );
            }
          }
        );
      });
    } else {
      res.send("badEmail").end();
    }

    connection.release();
  });
});

module.exports = app;
