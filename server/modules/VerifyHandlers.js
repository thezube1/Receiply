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
  if (!token) return res.send(false).end();
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) {
      res.send("badJWT").end();
    } else {
      const username = user.username;
      if (!username) res.send("badJWT").end();
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
    }
  });
});

app.get("/api/verify/user", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, token) => {
      if (err) throw err;
      connection.query(
        `SELECT VERIFIED FROM Accounts WHERE USER_ID='${token.user_id}'`,
        (err, data) => {
          if (err) throw err;
          const verified = data[0].VERIFIED;
          verified === 0 ? res.send(false).end() : res.send(true).end();
        }
      );
    });
    connection.release();
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "receiply@gmail.com",
    pass: "LetMeIn1234",
  },
});

app.get("/api/verify/resend", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, token) => {
      if (err) throw err;
      connection.query(
        `SELECT EMAIL, VERIFIED, USERNAME FROM Accounts WHERE USER_ID='${token.user_id}'`,
        (err, data) => {
          if (err) throw err;
          if (data[0].VERIFIED === 0) {
            jwt.sign(
              { username: data[0].USERNAME },
              process.env.ACCESS_TOKEN_KEY,
              (err, token) => {
                if (err) throw err;
                const mailOptions = {
                  from: "receiply@gmail.com",
                  to: data[0].EMAIL,
                  subject: "Please verify your Receiply account!",
                  text: `Verification link: receiply.com/verify/${token}`,
                };
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) throw err;
                  res.send(true).end();
                });
              }
            );
          }
        }
      );
    });
    connection.release();
  });
});

module.exports = app;
