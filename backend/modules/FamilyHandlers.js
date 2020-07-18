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
    const desc = req.body.family[1];
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
            connection.query(
              `INSERT INTO Families VALUES (UUID(), '${name}', '${desc}', '${date}')`,
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
                        const token = req.cookies.userAuth;
                        if (!token) return res.status(200).send(false);
                        jwt.verify(
                          req.cookies.userAuth,
                          process.env.ACCESS_TOKEN_KEY,
                          (err, result) => {
                            if (err) return res.status(500);
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
                        );
                      }
                    }
                  );
                }
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

module.exports = app;
