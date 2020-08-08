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
      `SELECT RECIPE_ID FROM Recipes WHERE RECIPE_ID LIKE '%${params[0]}%'`,
      (err, data) => {
        if (err) throw err;
        console.log(data);
      }
    );
  });
  console.log(params);
  res.end();
});

module.exports = app;
