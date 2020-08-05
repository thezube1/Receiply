const express = require("express");
const app = express();
const mysql = require("mysql");
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

    const d = new Date();
    const date = `${d.getMonth() + 1} ${d.getDate()} ${d.getFullYear()}`;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(
      req.cookies.userAuth,
      process.env.ACCESS_TOKEN_KEY,
      (err, result) => {
        if (err) return res.status(500);
        connection.query(
          `INSERT INTO Families VALUES (UUID(), ${Math.floor(
            Math.random() * 10000
          )}, '${name}', '${date}', '${result.user_id}')`,
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
                      `UPDATE Receiply.accounts SET FAMILY = '${data[0].FAMILY_ID}', FAMILY_AUTH = 1 WHERE USER_ID= '${result.user_id}'`,
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
              `SELECT a.FAMILY_ID, a.FAMILY_NAME, a.FAMILY_IDENTIFIER, a.FAMILY_CREATOR, Accounts.FIRST_NAME, 
              Accounts.LAST_NAME FROM (SELECT FAMILY_ID, FAMILY_NAME, FAMILY_CREATOR, FAMILY_IDENTIFIER FROM Receiply.Families 
              WHERE Families.FAMILY_NAME LIKE '%${lastName}%') a INNER JOIN Receiply.Accounts ON a.FAMILY_CREATOR=Accounts.USER_ID`,
              (err, family) => {
                if (err) throw err;
                if (family.length === 0) {
                  res.end();
                } else {
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

app.post("/api/requestfamily", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const userCookie = req.cookies.userAuth;
    jwt.verify(userCookie, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) throw err;
      const userID = result.user_id;
      const familyID = req.body.FAMILY_ID;
      connection.query(
        `UPDATE Receiply.accounts SET FAMILY = '${familyID}', FAMILY_AUTH = 'request' WHERE USER_ID= '${userID}'`,
        (err, data) => {
          if (err) throw err;
          res.send(true);
          res.end();
        }
      );
    });
    connection.release();
  });
});

app.get("/api/getfamilyrequests", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const userCookie = req.cookies.userAuth;
    if (!userCookie) return res.end();
    jwt.verify(userCookie, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) throw err;
      const userID = result.user_id;
      connection.query(
        `SELECT FAMILY FROM Accounts WHERE USER_ID='${userID}'`,
        (err, response) => {
          if (err) throw err;
          const familyID = response[0].FAMILY;
          connection.query(
            `SELECT USER_ID, USERNAME FROM Accounts WHERE FAMILY='${familyID}' AND FAMILY_AUTH='request'`,
            (err, data) => {
              if (err) throw err;
              if (data.length === 0) {
                res.end();
              } else {
                res.send(data);
                res.end();
              }
            }
          );
        }
      );
    });
    connection.release();
  });
});

app.post("/api/acceptfamilyuser", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const userID = req.body.USER_ID;
    connection.query(
      `UPDATE Accounts SET FAMILY_AUTH = 1 WHERE USER_ID='${userID}'`,
      (err, response) => {
        if (err) throw err;
        console.log("Request accepted");
      }
    );
  });
});

app.post("/api/ignorefamilyuser", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const userID = req.body.USER_ID;
    connection.query(
      `UPDATE Accounts SET FAMILY_AUTH = NULL, FAMILY = NULL WHERE USER_ID='${userID}'`,
      (err, response) => {
        if (err) throw err;
        console.log("Request ignored");
      }
    );
  });
});

module.exports = app;
