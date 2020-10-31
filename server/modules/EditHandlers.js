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
  multipleStatements: true,
});

app.put(`/api/recipe/:id`, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) throw err;
      const recipe = req.body.recipe;
      const checkShare = () => {
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

      const handleFamily = () => {
        if (recipe === "family") {
          return;
        }
      };

      const handleInserts = (recipeid, item, type) => {
        const array = item;
        let string = `INSERT INTO ${type} VALUES `;
        array.map((item, index) => {
          string = string.concat(
            `('${recipeid}', ${connection.escape(item)}, ${index}), `
          );
        });
        return string.substr(0, string.length - 2) + ";";
      };
      connection.query(
        `SELECT FAMILY FROM Accounts WHERE USER_ID='${user.user_id}'`,
        (err, family) => {
          if (err) throw err;
        }
      );
      connection.query(
        `UPDATE RECIPES SET TTM=${connection.escape(
          recipe.ttm
        )}, RECIPE_NAME=${connection.escape(recipe.recipe_name)},
    DESCRIPTION=${connection.escape(
      recipe.recipe_description
    )}, PUBLISH_STATE='${checkShare()}' WHERE RECIPE_IDENTIFIER='${
          recipe.recipe_identifier
        }'`,
        (err, response) => {
          if (err) throw err;
          connection.query(
            `SELECT RECIPE_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${recipe.recipe_identifier}'`,
            (err, id) => {
              if (err) throw err;
              if (recipe.share === "family") {
                connection.query(
                  `SELECT FAMILY FROM Accounts WHERE USER_ID=''`
                );
              }
              connection.query(
                `DELETE FROM Ingredients WHERE RECIPE_ID='${id[0].RECIPE_ID}'; DELETE FROM Prep WHERE RECIPE_ID='${id[0].RECIPE_ID}'; DELETE FROM Cooking_instructions WHERE RECIPE_ID='${id[0].RECIPE_ID}'; DELETE FROM Tags WHERE RECIPE_ID='${id[0].RECIPE_ID}';`,
                (err, response) => {
                  if (err) throw err;
                  connection.query(
                    `${handleInserts(
                      id[0].RECIPE_ID,
                      recipe.recipe_ingredients,
                      "Ingredients"
                    )} ${handleInserts(
                      id[0].RECIPE_ID,
                      recipe.prep_instructions,
                      "Prep"
                    )} ${handleInserts(
                      id[0].RECIPE_ID,
                      recipe.cooking_instructions,
                      "Cooking_instructions"
                    )} ${handleInserts(id[0].RECIPE_ID, recipe.tags, "Tags")}`,
                    (err, data) => {
                      if (err) throw err;
                      res.send(true).end();
                    }
                  );
                }
              );
            }
          );
        }
      );
    });

    /*
    const ingredients = JSON.stringify(recipe.recipe_ingredients);

    connection.query(
      `UPDATE Recipes SET TTM='${recipe.ttm}', RECIPE_NAME=${connection.escape(
        recipe.recipe_name
      )}, DESCRIPTION=${connection.escape(
        recipe.recipe_description
      )}, INGREDIENTS='{"ingredients": ${JSON.stringify(
        recipe.recipe_ingredients
      )}}', PREP_INSTRUCTIONS='{"prep": ${JSON.stringify(
        recipe.prep_instructions
      )}}', COOKING_INSTRUCTIONS='{"cooking": ${JSON.stringify(
        recipe.cooking_instructions
      )}}', TAGS='{"tags": ${JSON.stringify(
        recipe.tags
      )}}', PUBLISH_STATE='${checkShare()}' WHERE RECIPE_IDENTIFIER='${
        recipe.recipe_identifier
      }'`,
      (err, response) => {
        if (err) throw err;
        res.send(true).end();
      }
    );
    */
    connection.release();
  });
});

module.exports = app;
