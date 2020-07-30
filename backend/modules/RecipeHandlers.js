const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const e = require("express");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.post("/api/createrecipe", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) throw err;
      connection.query(
        `SELECT FAMILY, FAMILY_AUTH FROM Accounts WHERE USER_ID = '${result.user_id}'`,
        (err, family) => {
          if (err) throw err;
          if (family[0].FAMILY_AUTH !== "request") {
            if (family[0].FAMILY === "NULL" || family[0].FAMILY === null) {
              FAMILY_ID = null;
            } else {
              const FAMILY_ID = family[0].FAMILY;
            }

            const USER_ID = result.user_id;
            const recipe = req.body;
            connection.query(
              `INSERT INTO Recipes VALUES (uuid(), '${USER_ID}', '${FAMILY_ID}', CURDATE(), '${
                recipe.TTM
              }', '${recipe.name}', '${
                recipe.description
              }', '{"ingredients": ${JSON.stringify(
                recipe.ingredients
              )}}', '{"prep": ${JSON.stringify(
                recipe.prep
              )}}', '{"cooking": ${JSON.stringify(
                recipe.steps
              )}}', '{"tags": ${JSON.stringify(recipe.tags)}}', NULL, NULL)`,
              (err, response) => {
                if (err) throw err;
                else console.log("Success");
              }
            );
          } else {
            console.log("No family present");
          }
        }
      );
    });
  });
});

app.use(cookieParser());

module.exports = app;
