const express = require("express");
const app = express();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cookieParser());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.get("/api/getname", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) return console.log(err);
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(
      req.cookies.userAuth,
      process.env.ACCESS_TOKEN_KEY,
      (err, result) => {
        if (err) return res.status(500).send(false);
        if (result.auth === true) {
          connection.query(
            `SELECT FIRST_NAME, LAST_NAME from Accounts WHERE USER_ID = '${result.user_id}'`,
            (err, data) => {
              if (err) {
                console.log(err);
                res.end();
              }
              res.send(data[0]);
              res.end();
            }
          );
        }
      }
    );
    connection.release();
  });
});

app.get("/api/getfamily", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) return console.log(err);
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(
      req.cookies.userAuth,
      process.env.ACCESS_TOKEN_KEY,
      (err, result) => {
        if (err) return res.status(500).send(false);
        if (result.auth === true) {
          connection.query(
            `SELECT FAMILY from Accounts WHERE USER_ID = '${result.user_id}'`,
            (err, data) => {
              if (err) {
                console.log(err);
                res.end();
              }
              if (
                data[0] === undefined ||
                data === undefined ||
                data[0].FAMILY === null ||
                data[0].FAMILY === "null" ||
                data.length === 0
              ) {
                console.log("No family found!");
                res.send(false);
                res.end();
              } else {
                connection.query(
                  `SELECT FAMILY_NAME FROM Families WHERE FAMILY_ID = '${data[0].FAMILY}'`,
                  (err, data) => {
                    if (err) {
                      console.log(err);
                    }
                    res.send(data[0].FAMILY_NAME);
                    res.end();
                  }
                );
              }
            }
          );
        }
      }
    );
    connection.release();
  });
});

app.get("/api/getfamily/description", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) return console.log(err);
    jwt.verify(
      req.cookies.userAuth,
      process.env.ACCESS_TOKEN_KEY,
      (err, token) => {
        if (err) return console.log(err);
        connection.query(
          `SELECT FAMILY FROM Accounts WHERE USER_ID='${token.user_id}'`,
          (err, result1) => {
            if (err) return console.log(err);
            const family = result1[0].FAMILY;
            connection.query(
              `SELECT FAMILY_DESCRIPTION FROM Families WHERE FAMILY_ID='${family}'`,
              (err, result2) => {
                if (err) return console.log(err);
                res.send(result2[0].FAMILY_DESCRIPTION);
                res.end();
              }
            );
          }
        );
      }
    );
    connection.release();
  });
});

app.get("/api/getfamily/members", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) return console.log(err);
    jwt.verify(
      req.cookies.userAuth,
      process.env.ACCESS_TOKEN_KEY,
      (err, token) => {
        if (err) return console.log(err);
        connection.query(
          `SELECT FAMILY FROM Accounts WHERE USER_ID='${token.user_id}'`,
          (err, result1) => {
            if (err) return console.log(err);
            const family = result1[0].FAMILY;
            connection.query(
              `SELECT FIRST_NAME, LAST_NAME, USER_ID FROM Accounts WHERE FAMILY='${family}'`,
              (err, result2) => {
                if (err) return console.log(err);
                else {
                  res.json(result2);
                  res.end();
                }
              }
            );
          }
        );
      }
    );
    connection.release();
  });
});
module.exports = app;
