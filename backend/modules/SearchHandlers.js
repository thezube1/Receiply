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
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT RECIPE_NAME FROM Recipes WHERE MATCH (RECIPE_NAME) AGAINST '${req.body[0]}'`,
      (err, data) => {
        if (err) throw err;
        console.log(data);
      }
    );
  });
  res.end();
});

module.exports = app;
