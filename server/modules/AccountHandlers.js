const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
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

app.post("/api/user/login", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) return console.log(err);
    const email = req.body.account[0];
    const pass = req.body.account[1];
    console.log("Initiating check!");
    connection.query(
      `SELECT EMAIL, PASS, USER_ID FROM Accounts WHERE EMAIL='${email}'`,
      (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data[0] === undefined) {
          console.log("User does not exist!");
        } else {
          let userPassword = data[0].PASS;
          bcrypt.compare(pass, userPassword, (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result === true) {
              console.log("User authenticated!");
              jwt.sign(
                { user_id: data[0].USER_ID, auth: true },
                process.env.ACCESS_TOKEN_KEY,
                (err, token) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.cookie("userAuth", token, {
                      httpOnly: true,
                      secure: false,
                    });
                    res.send(true);
                    res.end();
                  }
                }
              );
            } else {
              console.log("Incorrect password!");
              res.send("badpass");
              res.end();
            }
          });
        }
      }
    );
    connection.release();
  });
});

app.get("/api/user/logout", (req, res) => {
  const token = req.cookies.userAuth;
  if (!token) return res.send(false).end();
  res.clearCookie("userAuth").send(true);
  res.end();
});

app.post("/api/user/create", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const email = req.body.account[0];
    const first = req.body.account[1];
    const last = req.body.account[2];
    const user = req.body.account[3];
    const pass = req.body.account[4];
    connection.query(
      `SELECT EMAIL, PASS FROM Accounts WHERE EMAIL='${email}'`,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (data[0] === undefined) {
            connection.query(
              `SELECT USERNAME FROM Accounts WHERE USERNAME='${user}'`,
              (err, exists) => {
                if (err) throw err;
                if (exists[0] === undefined) {
                  bcrypt.hash(
                    pass,
                    parseInt(process.env.SALT_ROUNDS),
                    (err, hash) => {
                      if (err) console.log(err);
                      const hashPass = String(hash);
                      connection.query(
                        `INSERT INTO Accounts VALUES (UUID(), '${email}', '${user}', '${hashPass}', '${first}', '${last}', NULL, NULL)`,
                        (err, data) => {
                          if (err) {
                            console.log(err);
                          } else {
                            res.send(true);
                            res.end();
                          }
                        }
                      );
                    }
                  );
                } else {
                  res.send("badUser").end();
                }
              }
            );
          } else {
            res.send("badEmail");
            res.end();
          }
        }
      }
    );
    connection.release();
  });
});

app.get("/api/user/authorize", (req, res) => {
  const token = req.cookies.userAuth;
  if (!token) return res.send(false).end();
  jwt.verify(
    req.cookies.userAuth,
    process.env.ACCESS_TOKEN_KEY,
    (err, result) => {
      if (err) return res.status(500).send(false).end();
      if (result.auth === true) {
        res.send(true);
        res.end();
      }
      if (result.auth === false) {
        res.send(false);
        res.end();
      }
    }
  );
});

app.get("/api/user/current", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.send(false).end();
    jwt.verify(
      req.cookies.userAuth,
      process.env.ACCESS_TOKEN_KEY,
      (err, result) => {
        if (err) throw err;
        connection.query(
          `SELECT USER_ID, EMAIL, USERNAME, FIRST_NAME, LAST_NAME FROM Accounts WHERE USER_ID='${result.user_id}'`,
          (err, data) => {
            if (err) throw err;
            res.send(data).end();
          }
        );
      }
    );
    connection.release();
  });
});

app.get("/api/user/:user", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT USER_ID, USERNAME, FIRST_NAME, LAST_NAME, FAMILY FROM Accounts WHERE USERNAME='${req.params.user}'`,
      (err, data) => {
        if (err) throw err;
        if (data.length === 0) {
          res.send(false);
          res.end();
        } else {
          if (data[0].FAMILY === null || data[0].FAMILY === "NULL") {
            data[0].FAMILY = "No family";
            res.send(data);
            res.end();
          } else {
            connection.query(
              `SELECT FAMILY_NAME FROM Families WHERE FAMILY_ID='${data[0].FAMILY}'`,
              (err, family) => {
                if (err) throw err;
                data[0].FAMILY = family[0].FAMILY_NAME;
                res.send(data);
                res.end();
              }
            );
          }
        }
      }
    );
    connection.release();
  });
});
module.exports = app;

app.get("/api/user/:user/recipes/public", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT USER_ID FROM Accounts WHERE USERNAME='${req.params.user}'`,
      (err, data) => {
        if (err) throw err;
        connection.query(
          `SELECT * FROM Recipes WHERE CREATOR_ID='${data[0].USER_ID}' AND PUBLISH_STATE='public'`,
          (err, response) => {
            if (err) throw err;
            res.send(response).end();
          }
        );
      }
    );
    connection.release();
  });
});
