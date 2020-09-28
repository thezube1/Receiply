const express = require("express");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
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

app.get("/api/recipe/:recipeid/like", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) throw err;
      connection.query(
        `SELECT RECIPE_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.recipeid}'`,
        (err, response) => {
          if (err) throw err;
          const RECIPE_ID = response[0].RECIPE_ID;
          const USER_ID = result.user_id;
          connection.query(
            `INSERT INTO Likes VALUES (uuid(), '${USER_ID}', 'recipe', '${RECIPE_ID}')`,
            (err, data) => {
              if (err) throw err;
              connection.query(
                `UPDATE Recipes SET LIKES = LIKES + 1 WHERE RECIPE_ID='${RECIPE_ID}'`,
                (err, data) => {
                  if (err) throw err;
                  res.send(true);
                  res.end();
                }
              );
            }
          );
        }
      );
    });
    connection.release();
  });
});

app.get("/api/recipe/:recipeid/unlike", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) throw err;
      connection.query(
        `SELECT RECIPE_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.recipeid}'`,
        (err, recipe) => {
          if (err) throw err;
          const USER_ID = result.user_id;
          const RECIPE_ID = recipe[0].RECIPE_ID;
          connection.query(
            `DELETE FROM Likes WHERE USER_ID='${USER_ID}' AND ITEM='${RECIPE_ID}' AND LIKE_TYPE='recipe'`,
            (err, response) => {
              if (err) throw err;
              connection.query(
                `UPDATE Recipes SET LIKES = LIKES - 1 WHERE RECIPE_ID='${RECIPE_ID}'`,
                (err, response) => {
                  if (err) throw err;
                  res.send(true).end();
                }
              );
            }
          );
        }
      );
    });
    connection.release();
  });
});

app.get("/api/recipe/:recipeid/check-like", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) throw err;
      const USER_ID = result.user_id;
      connection.query(
        `SELECT RECIPE_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.recipeid}'`,
        (err, recipe) => {
          if (err) throw err;
          const RECIPE_ID = recipe[0].RECIPE_ID;
          connection.query(
            `SELECT LIKE_ID FROM Likes WHERE USER_ID='${USER_ID}' AND LIKE_TYPE='recipe' AND ITEM='${RECIPE_ID}'`,
            (err, response) => {
              if (err) throw err;
              if (response.length === 0) {
                res.send(false).end();
              } else {
                res.send(true).end();
              }
            }
          );
        }
      );
    });
    connection.release();
  });
});

module.exports = app;
