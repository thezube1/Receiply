const express = require("express");
const app = express();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.get("/api/getname", (req, res) => {
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
});
module.exports = app;
