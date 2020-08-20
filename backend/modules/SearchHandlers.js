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
  params = req.body.s;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM Recipes WHERE (RECIPE_NAME LIKE '%${params}%')`,
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
    connection.release();
  });
});

module.exports = app;
