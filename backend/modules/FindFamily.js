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
              `SELECT FAMILY_NAME FROM Families WHERE FAMILY_NAME LIKE '%${lastName}%'`,
              (err, family) => {
                if (err) throw err;
                console.log(family);
              }
            );
          }
        );
      }
    );
  });
});

module.exports = app;
