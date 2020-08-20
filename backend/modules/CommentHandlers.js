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

app.get("/api/comment/:recipeid", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const RECIPE_IDENTIFIER = req.params.recipeid;
    connection.query(
      `SELECT RECIPE_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${RECIPE_IDENTIFIER}'`,
      (err, recipe) => {
        if (err) throw err;
        const RECIPE_ID = recipe[0].RECIPE_ID;
        connection.query(
          `SELECT COMMENT_ID, RECIPE_ID, COMMENTER_ID, FIRST_NAME, LAST_NAME, COMMENT_CONTENT, LIKES FROM Receiply.Comments INNER JOIN Receiply.Accounts ON Comments.COMMENTER_ID = Accounts.USER_ID WHERE RECIPE_ID='${RECIPE_ID}'`,
          (err, data) => {
            if (err) throw err;
            if (data.length === 0) {
              res.send(false).end();
            } else {
              res.send(data).end();
            }
          }
        );
      }
    );
    connection.release();
  });
});

app.post("/api/comment", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(
      req.cookies.userAuth,
      process.env.ACCESS_TOKEN_KEY,
      (err, result) => {
        if (err) throw err;
        const RECIPE_IDENTIFIER = req.body.recipeid;
        connection.query(
          `SELECT RECIPE_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${RECIPE_IDENTIFIER}'`,
          (err, recipe) => {
            if (err) throw err;
            const RECIPE_ID = recipe[0].RECIPE_ID;
            const COMMENT = req.body.comment;
            const USER_ID = result.user_id;
            connection.query(
              `INSERT INTO Comments VALUES (UUID(), '${RECIPE_ID}', '${USER_ID}', ${connection.escape(
                COMMENT
              )}, CURDATE(), 0)`,
              (err, response) => {
                if (err) throw err;
                res.send(true).end();
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
