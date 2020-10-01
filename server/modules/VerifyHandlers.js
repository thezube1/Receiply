const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.use(cookieParser());

app.put("/api/verify/:verify", (req, res) => {
  const token = req.params.verify;
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) {
      console.log(err);
      res.send(false).end();
    }
    const username = user.username;
    if (!username) res.send(false).end();
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE Accounts SET VERIFIED=1 WHERE USERNAME='${username}'`,
        (err, response) => {
          if (err) throw err;
          res.send(true).end();
        }
      );
      connection.release();
    });
  });
});

module.exports = app;
