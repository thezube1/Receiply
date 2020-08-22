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

app.post("/api/search", (req, res) => {
  const token = req.cookies.userAuth;
  if (!token) return res.send(false).end();
  jwt.verify(
    req.cookies.userAuth,
    process.env.ACCESS_TOKEN_KEY,
    (err, result) => {
      if (err) throw err;
      params = req.body.s;

      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          `SELECT * FROM Accounts WHERE USER_ID='${result.user_id}'`,
          (err, user) => {
            if (err) throw err;

            const filterPrivacy = () => {
              if (req.body.shr === "prv") {
                return `AND PUBLISH_STATE='private' AND CREATOR_ID='${result.user_id}'`;
              } else if (req.body.shr === "fam") {
                if (
                  user[0].FAMILY === "NULL" ||
                  user[0].FAMILY === null ||
                  user[0].FAMILY_AUTH === 0
                ) {
                  res.send(false).end();
                } else {
                  return `AND FAMILY_ID='${user[0].FAMILY}' AND PUBLISH_STATE='family'`;
                }
              } else if (req.body.shr === "pub") {
                return `AND PUBLISH_STATE='public'`;
              } else {
                return `AND (PUBLISH_STATE='family' AND FAMILY_ID='${user[0].FAMILY}') OR PUBLISH_STATE='public' OR (CREATOR_ID='${result.user_id}' AND PUBLISH_STATE='private')`;
              }
            };

            connection.query(
              `SELECT * FROM Recipes WHERE (RECIPE_NAME LIKE '%${params}%') ${filterPrivacy()}`,
              (err, data) => {
                if (err) throw err;
                if (data.length === 0) {
                  res.send(false);
                  res.end();
                } else {
                  res.send(data);
                  res.end();
                }
              }
            );
          }
        );

        connection.release();
      });
    }
  );
});

module.exports = app;
