const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

app.get("/api/invite/:familyID", (req, res) => {
  console.log(req.params.familyID);
});

module.exports = app;
