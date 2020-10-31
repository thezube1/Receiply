const express = require("express");
const app = express();
const mysql = require("mysql");
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

app.use(cookieParser());

app.post("/api/search", (req, res) => {
  const token = req.cookies.userAuth;
  if (!token) return res.send(false).end();
  jwt.verify(
    req.cookies.userAuth,
    process.env.ACCESS_TOKEN_KEY,
    (err, result) => {
      if (err) throw err;
      const params = req.body.s;
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

            const filterIngredients = () => {
              let ingredientFilter;
              if (typeof req.body.ingr === "string") {
                ingredientFilter = [req.body.ingr];
              } else if (typeof req.body.ingr === "object") {
                ingredientFilter = req.body.ingr;
              } else {
                return "";
              }
              const ingredientChecks = ingredientFilter.join(" ");
              console.log(ingredientChecks);
              return `AND INGREDIENTS LIKE '%${ingredientChecks}%'`;
            };

            connection.query(
              `SELECT * FROM Recipes WHERE (RECIPE_NAME LIKE '%${params}%') ${filterPrivacy()} ${filterIngredients()}`,
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

app.post("/api/family/search", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    let query = req.body.s;
    if (!query) {
      res.send(false).end();
    } else {
      query.replace("-", " ");
      connection.query(
        `SELECT a.FAMILY_ID, a.FAMILY_NAME, a.FAMILY_IDENTIFIER, a.FAMILY_CREATOR, Accounts.FIRST_NAME, 
                Accounts.LAST_NAME FROM (SELECT FAMILY_ID, FAMILY_NAME, FAMILY_CREATOR, FAMILY_IDENTIFIER FROM Receiply.Families 
                WHERE Families.FAMILY_NAME LIKE '%${query}%') a INNER JOIN Receiply.Accounts ON a.FAMILY_CREATOR=Accounts.USER_ID`,
        (err, data) => {
          if (err) throw err;
          res.send(data).end();
        }
      );
    }
    connection.release();
  });
});

app.use((err, req, res, next) => {
  res.status(500);
  res.send("Oops, something went wrong");
});

module.exports = app;
