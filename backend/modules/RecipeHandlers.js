const express = require("express");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

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
});

app.post("/api/createrecipe", upload.single("myImage"), (req, res) => {
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
              )}}', '{"tags": ${JSON.stringify(
                recipe.tags
              )}}', '${SHARING}', '${newPath}')`,
              (err, response) => {
                if (err) {
                  throw err;
                } else {
                  res.send(true);
                  res.end();
                }
              }
            );
          } else {
            console.log("No family present");
          }
        }
      );
    });
    connection.release();
  });
});

app.get("/api/myrecipes/card", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      const USER_ID = user.user_id;
      connection.query(
        `SELECT RECIPE_ID, RECIPE_NAME, DESCRIPTION, TTM, DATE_CREATED, PHOTO_NAME FROM Recipes WHERE CREATOR_ID = '${USER_ID}'`,
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

app.get("/api/familyrecipes/card", (req, res) => {
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
            family[0].FAMILY_AUTH === "request" ||
            family[0].FAMILY === "NULL" ||
            family[0].FAMILY === undefined
          ) {
            res.send(false);
            res.end();
          } else {
            connection.query(
              `SELECT RECIPE_ID, RECIPE_NAME, DESCRIPTION, TTM, DATE_CREATED, PHOTO_NAME FROM Recipes WHERE FAMILY_ID = '${family[0].FAMILY}' AND PUBLISH_STATE = "family"`,
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

app.use(cookieParser());

module.exports = app;