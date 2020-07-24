const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.use(cookieParser());

app.post("/api/addfamily", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) return console.log(err);
    const name = req.body.family[0];
    connection.query(
      `SELECT FAMILY_NAME from Families WHERE FAMILY_NAME='${name}'`,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (data.length === 0) {
            const d = new Date();
            const date = `${
              d.getMonth() + 1
            } ${d.getDate()} ${d.getFullYear()}`;
            const token = req.cookies.userAuth;
            if (!token) return res.status(200).send(false);
            jwt.verify(
              req.cookies.userAuth,
              process.env.ACCESS_TOKEN_KEY,
              (err, result) => {
                if (err) return res.status(500);
                connection.query(
                  `INSERT INTO Families VALUES (UUID(), '${name}', '${date}', '${result.user_id}')`,
                  (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Successfully created family!");
                      connection.query(
                        `SELECT FAMILY_ID FROM Families WHERE FAMILY_NAME = '${name}'`,
                        (err, data) => {
                          if (err) {
                            console.log(err);
                          } else {
                            connection.query(
                              `UPDATE Receiply.accounts SET FAMILY = '${data[0].FAMILY_ID}' WHERE USER_ID= '${result.user_id}'`,
                              (err, data) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  console.log("Everything has been updated!");
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            );
          } else {
            console.log(
              `Family with name ${data[0].FAMILY_NAME} has already been created`
            );
          }
        }
      }
    );
    connection.release();
  });
});

app.get("/api/findfamily", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const userCookie = req.cookies.userAuth;
    if (!userCookie) return res.status(200).send(false);
    jwt.verify(
      req.cookies.userAuth,
      process.env.ACCESS_TOKEN_KEY,
      (err, result) => {
        if (err) throw err;
        connection.query(
          `SELECT LAST_NAME FROM Accounts WHERE USER_ID = '${result.user_id}'`,
          (err, data) => {
            if (err) throw err;
            const lastName = data[0].LAST_NAME;
            connection.query(
              `SELECT a.FAMILY_NAME, a.FAMILY_CREATOR, Accounts.FIRST_NAME, Accounts.LAST_NAME FROM (SELECT FAMILY_NAME, FAMILY_CREATOR FROM Receiply.Families WHERE Families.FAMILY_NAME LIKE '%${lastName}%') a INNER JOIN Receiply.Accounts ON a.FAMILY_CREATOR=Accounts.USER_ID`,
              (err, family) => {
                if (err) throw err;
                if (family.length === 0) {
                  res.send(false);
                  res.end();
                } else {
                  console.log("Sent");
                  res.send(family);
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
