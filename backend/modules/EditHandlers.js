const express = require("express");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
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

app.put(`/api/recipe/:id`, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const recipe = req.body.recipe;
    checkShare = () => {
      switch (recipe.share) {
        case 1:
          return "private";
        case 2:
          return "family";
        case 3:
          return "public";
        default:
          return "private";
      }
    };
    connection.query(
      `UPDATE Recipes SET TTM='${recipe.ttm}', RECIPE_NAME=${connection.escape(
        recipe.recipe_name
      )}, DESCRIPTION=${connection.escape(
        recipe.recipe_description
      )}, INGREDIENTS='{"ingredients": ${
        recipe.recipe_ingredients
      }}', PREP_INSTRUCTIONS='{"prep": ${
        recipe.recipe_ingredients
      }}, COOKING_INSTRUCTIONS='{"cooking": ${
        recipe.cooking_instructions
      }}, TAGS='{"tags": ${JSON.stringify(
        recipe.tags
      )}}, PUBLISH_STATE=${checkShare()} WHERE RECIPE_IDENTIFIER='${
        recipe.recipe_identifier
      }'`,
      (err, res) => {
        if (err) throw err;
        console.log(res);
      }
    );
  });
});

module.exports = app;
