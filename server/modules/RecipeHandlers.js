const express = require("express");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cookieParser());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(console.log("allowed"), true);
  } else {
    cb(console.log("Not allowed type"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 3840 * 2160 * 1000,
  },
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  multipleStatements: true,
});

app.post("/api/recipe", upload.single("myImage"), (req, res) => {
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
          if (
            family[0].FAMILY === null ||
            family[0].FAMILY_AUTH === "request"
          ) {
            res.send("badFamily").end();
          } else {
            let SHARING;
            let FAMILY_ID;
            const USER_ID = result.user_id;
            let PHOTO_PATH = req.file.path;
            let newPath = PHOTO_PATH.replace("uploads\\", "");
            newPath = "uploads/" + newPath;
            const recipe = req.body;
            if (family[0].FAMILY === "NULL" || family[0].FAMILY === null) {
              FAMILY_ID = null;
            } else {
              FAMILY_ID = family[0].FAMILY;
            }
            if (recipe.sharing === "1") {
              SHARING = "private";
            } else if (recipe.sharing === "2") {
              SHARING = "family";
            } else {
              SHARING = "public";
            }

            const handleInserts = (item, type) => {
              const array = JSON.parse(item);
              let string = `INSERT INTO ${type} VALUES `;
              array.map((item, index) => {
                string = string.concat(
                  `(@recipe_uuid, ${connection.escape(item)}, ${index}), `
                );
              });
              return string.substr(0, string.length - 2) + ";";
            };

            connection.query(
              `SET @recipe_uuid := uuid(); INSERT INTO Recipes (RECIPE_ID, RECIPE_IDENTIFIER, CREATOR_ID, FAMILY_ID, DATE_CREATED, TTM, RECIPE_NAME, DESCRIPTION, PUBLISH_STATE, PHOTO_NAME, LIKES) VALUES (@recipe_uuid, uuid_short(), '${USER_ID}', '${FAMILY_ID}', CURDATE(), ${connection.escape(
                recipe.TTM
              )}, ${connection.escape(recipe.name)}, ${connection.escape(
                recipe.description
              )}, '${SHARING}', '${newPath}', 0); ${handleInserts(
                recipe.ingredients,
                "Ingredients"
              )} ${handleInserts(recipe.prep, "Prep")} ${handleInserts(
                recipe.steps,
                "Cooking_instructions"
              )} ${handleInserts(recipe.tags, "Tags")}`,
              (err, data) => {
                if (err) throw err;
                res.send(true).end();
              }
            );

            /*
            connection.query(
              `INSERT INTO Recipes VALUES (uuid(), uuid_short(), '${USER_ID}', '${FAMILY_ID}', CURDATE(), ${connection.escape(
                recipe.TTM
              )}, ${connection.escape(recipe.name)}, ${connection.escape(
                recipe.description
              )}`,
              (err, data) => {
                if (err) throw err;
                connection.query(`INSERT INTO Ingredients VALUES (uuid(), )`)
              }
            );
            

            
            connection.query(
              `INSERT INTO Recipes VALUES (uuid(), uuid_short(), '${USER_ID}', '${FAMILY_ID}', CURDATE(), ${connection.escape(
                recipe.TTM
              )}, ${connection.escape(recipe.name)}, ${connection.escape(
                recipe.description
              )}, '{"ingredients": ${recipe.ingredients}}', '{"prep": ${
                recipe.prep
              }}', '{"cooking": ${recipe.steps}}', '{"tags": ${
                recipe.tags
              }}', '${SHARING}', '${newPath}', 0)`,
              (err, response) => {
                if (err) {
                  throw err;
                } else {
                  res.send(true);
                  res.end();
                }
              }
            );
            */
          }
        }
      );
    });
    connection.release();
  });
});

app.get("/api/recipe/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    connection.query(
      `SELECT * FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.id}'`,
      (err, recipe) => {
        if (err) throw err;
        if (recipe.length === 0) {
          console.log("No recipe found!");
          res.send(false);
          res.end();
        } else {
          connection.query(
            `SELECT * FROM Ingredients WHERE RECIPE_ID='${recipe[0].RECIPE_ID}' ORDER BY STEP ASC; SELECT * FROM Prep WHERE RECIPE_ID='${recipe[0].RECIPE_ID}' ORDER BY STEP ASC; SELECT * FROM Cooking_instructions WHERE RECIPE_ID='${recipe[0].RECIPE_ID}' ORDER BY STEP ASC; SELECT * FROM Tags WHERE RECIPE_ID='${recipe[0].RECIPE_ID}' ORDER BY STEP ASC`,
            (err, recipeData) => {
              if (err) throw err;
              let data = {
                recipe: recipe[0],
                ingredients: recipeData[0],
                prep: recipeData[1],
                cooking_instructions: recipeData[2],
                tags: recipeData[3],
              };

              if (recipe.length === 0) {
                console.log("No recipe found!");
                res.send(false);
                res.end();
              } else if (recipe[0].PUBLISH_STATE === "private") {
                if (token.user_id === recipe.CREATOR_ID) {
                  res.send(data);
                  res.end();
                } else {
                  res.send(false);
                  res.end();
                }
              } else if (recipe[0].PUBLIC_STATE === "family") {
                connection.query(
                  `SELECT FAMILY, FAMILY_AUTH FROM Accounts WHERE USER_ID='${token.user_id}'`,
                  (err, response) => {
                    if (err) throw err;
                    if (response.FAMILY_AUTH === 1) {
                      if (response.FAMILY === recipe.FAMILY_ID) {
                        res.send(data).end();
                      } else {
                        res.send(false).end();
                      }
                    }
                  }
                );
              } else {
                console.log("Sending public recipe!");
                res.send(data);
                res.end();
              }
            }
          );
        }
      }
    );
    connection.release();
  });
});

app.delete("/api/recipe/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) throw err;
      connection.query(
        `SELECT CREATOR_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.id}'`,
        (err, check) => {
          if (err) throw err;
          if (check[0].CREATOR_ID === user.user_id) {
            connection.query(
              `SELECT RECIPE_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.id}'`,
              (err, recipe) => {
                if (err) throw err;
                connection.query(
                  `DELETE FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.id}'; DELETE FROM Ingredients WHERE RECIPE_ID='${recipe[0].RECIPE_ID}'; DELETE FROM Prep WHERE RECIPE_ID='${recipe[0].RECIPE_ID}'; DELETE FROM Cooking_instructions WHERE RECIPE_ID='${recipe[0].RECIPE_ID}'; DELETE FROM Tags WHERE RECIPE_ID='${recipe[0].RECIPE_ID}';`,
                  (err, response) => {
                    if (err) throw err;
                    res.send(true).end();
                  }
                );
              }
            );
          } else {
            res.send(false).end();
          }
        }
      );
    });
    connection.release();
  });
});

app.get("/api/recipe/:id/creator", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT CREATOR_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.id}'`,
      (err, creator) => {
        if (err) throw err;
        connection.query(
          `SELECT FIRST_NAME, LAST_NAME, USERNAME FROM Accounts WHERE USER_ID='${creator[0].CREATOR_ID}'`,
          (err, user) => {
            if (err) throw err;
            res.send(user);
            res.end();
          }
        );
      }
    );
    connection.release();
  });
});

app.get("/api/recipe/:id/edit/authenticate", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) throw err;
      const USER_ID = user.user_id;
      connection.query(
        `SELECT CREATOR_ID FROM Recipes WHERE RECIPE_IDENTIFIER='${req.params.id}'`,
        (err, data) => {
          if (err) throw err;
          if (data.length === 0) {
            res.send(false).end();
          } else if (data[0].CREATOR_ID === USER_ID) {
            res.send(true).end();
          } else {
            res.send(false).end();
          }
        }
      );
    });
    connection.release();
  });
});

app.get("/api/recipes/user", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      const USER_ID = user.user_id;
      connection.query(
        `SELECT * FROM Recipes WHERE CREATOR_ID = '${USER_ID}'`,
        (err, response) => {
          if (err) throw err;
          if (response.length === 0) {
            res.send(false);
            res.end();
          } else {
            res.send(response);
            res.end();
          }
        }
      );
    });
    connection.release();
  });
});

app.get("/api/recipes/family", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      const USER_ID = user.user_id;
      connection.query(
        `SELECT FAMILY, FAMILY_AUTH FROM Accounts WHERE USER_ID = '${USER_ID}'`,
        (err, family) => {
          if (err) throw err;

          if (
            family.length === 0 ||
            family[0].FAMILY === "NULL" ||
            family[0].FAMILY === undefined ||
            family[0].FAMILY_AUTH === "request"
          ) {
            res.send(false);
            res.end();
          } else {
            connection.query(
              `SELECT * FROM Recipes WHERE FAMILY_ID = '${family[0].FAMILY}' AND PUBLISH_STATE = "family"`,
              (err, response) => {
                if (err) throw err;
                if (response.length === 0) {
                  res.send(false);
                  res.end();
                } else {
                  res.send(response);
                  res.end();
                }
              }
            );
          }
        }
      );
    });
    connection.release();
  });
});

app.get("/api/recipes/public", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM receiply.recipes WHERE PUBLISH_STATE='public' ORDER BY LIKES DESC`,
      (err, data) => {
        if (err) throw err;
        res.send(data);
        res.end();
      }
    );
    connection.release();
  });
});

module.exports = app;
