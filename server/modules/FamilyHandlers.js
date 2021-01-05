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

app.post("/api/family", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) return console.log(err);
    const name = req.body.family[0];
    const d = new Date();
    const date = `${d.getMonth() + 1} ${d.getDate()} ${d.getFullYear()}`;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) return res.status(500);
      connection.query(
        `SELECT VERIFIED FROM Accounts WHERE USER_ID='${result.user_id}'`,
        (err, data) => {
          if (err) throw err;
          if (data[0].VERIFIED === 0) {
            res.send(false).end();
          } else {
            connection.query(
              `INSERT INTO Families VALUES (UUID(), ${Math.floor(
                Math.random() * 10000
              )}, '${name}', '${date}', '${result.user_id}')`,
              (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Successfully created family!");
                  connection.query(
                    `SELECT FAMILY_ID FROM Families WHERE FAMILY_NAME = '${name}'`,
                    (err, data) => {
                      if (err) {
                        console.log(err);
                      } else {
                        connection.query(
                          `UPDATE Receiply.accounts SET FAMILY = '${data[0].FAMILY_ID}', FAMILY_AUTH = 1 WHERE USER_ID= '${result.user_id}'`,
                          (err, data) => {
                            if (err) {
                              console.log(err);
                            } else {
                              res.send(true).end();
                            }
                          }
                        );
                      }
                    }
                  );
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

app.get("/api/check", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;

    const selectRecipes = async (check) => {
      const query = await connection.query(`SELECT * FROM Recipes`);
      if (check === true) {
        res.send(query).end();
      } else {
        res.send(false).end();
      }
    };

    if (!token) {
      selectRecipes(false);
    } else {
      selectRecipes(true);
    }
  });
});

app.get("/api/family", (req, res) => {
  const token = req.cookies.userAuth;
  if (!token) return res.status(200).send(false);
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) throw err;
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT FAMILY FROM Accounts WHERE USER_ID='${user.user_id}'`,
        (err, data) => {
          if (err) throw err;
          connection.query(
            `SELECT * FROM Families WHERE FAMILY_ID='${data[0].FAMILY}'`,
            (err, family) => {
              if (err) throw err;
              res.send(family[0]).end();
            }
          );
        }
      );
      connection.release();
    });
  });
});

app.post("/api/family/request", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const userCookie = req.cookies.userAuth;
    if (!userCookie) return res.send(false).end();
    jwt.verify(userCookie, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) throw err;
      connection.query(
        `SELECT VERIFIED FROM Accounts WHERE USER_ID='${result.user_id}'`,
        (err, data) => {
          if (err) throw err;
          if (data[0].VERIFIED === 0) {
            res.send(false).end();
          } else {
            const userID = result.user_id;
            const familyID = req.body.FAMILY_ID;
            connection.query(
              `UPDATE Accounts SET FAMILY = '${familyID}', FAMILY_AUTH = 'request' WHERE USER_ID= '${userID}'`,
              (err, data) => {
                if (err) throw err;
                res.send(true);
                res.end();
              }
            );
          }
        }
      );
    });
    connection.release();
  });
});

app.get("/api/family/request", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) res.send("pool err").end();
    const userCookie = req.cookies.userAuth;
    if (!userCookie) return res.send(false).end();
    jwt.verify(userCookie, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) res.send("verify err").end();
      connection.query(
        `SELECT VERIFIED FROM Accounts WHERE USER_ID='${result.user_id}'`,
        (err, data) => {
          if (err) res.send("query 1 err").end();
          if (data[0].USER_ID === 0) {
            res.send(false).end();
          } else {
            const userID = result.user_id;
            connection.query(
              `SELECT FAMILY FROM Accounts WHERE USER_ID='${userID}'`,
              (err, response) => {
                if (err) res.send("query 2 err").end();
                const familyID = response[0].FAMILY;
                connection.query(
                  `SELECT USER_ID, USERNAME FROM Accounts WHERE FAMILY='${familyID}' AND FAMILY_AUTH='request'`,
                  (err, data) => {
                    if (err) res.send("query 3 err").end();
                    if (data.length === 0) {
                      res.send(false).end();
                    } else {
                      res.send(data);
                      res.end();
                    }
                  }
                );
              }
            );
          }
        }
      );
    });
    connection.release();
  });
});

app.put("/api/family/request/accept", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const userID = req.body.USER_ID;
    connection.query(
      `UPDATE Accounts SET FAMILY_AUTH = 1 WHERE USER_ID='${userID}'`,
      (err, response) => {
        if (err) throw err;
        console.log("Request accepted");
      }
    );
  });
});

app.post("/api/family/request/ignore", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const userID = req.body.USER_ID;
    connection.query(
      `UPDATE Accounts SET FAMILY_AUTH = NULL, FAMILY = NULL WHERE USER_ID='${userID}'`,
      (err, response) => {
        if (err) throw err;
        console.log("Request ignored");
      }
    );
  });
});

app.get("/api/family/suggest", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const token = req.cookies.userAuth;
    if (!token) return res.status(200).send(false);
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, result) => {
      if (err) throw err;
      connection.query(
        `SELECT LAST_NAME FROM Accounts WHERE USER_ID = '${result.user_id}'`,
        (err, data) => {
          if (err) throw err;
          const lastName = data[0].LAST_NAME;
          connection.query(
            `SELECT a.FAMILY_ID, a.FAMILY_NAME, a.FAMILY_IDENTIFIER, a.FAMILY_CREATOR, Accounts.FIRST_NAME, 
              Accounts.LAST_NAME FROM (SELECT FAMILY_ID, FAMILY_NAME, FAMILY_CREATOR, FAMILY_IDENTIFIER FROM Receiply.Families 
              WHERE Families.FAMILY_NAME LIKE '%${lastName}%') a INNER JOIN Receiply.Accounts ON a.FAMILY_CREATOR=Accounts.USER_ID`,
            (err, family) => {
              if (err) throw err;
              if (family.length === 0) {
                res.end();
              } else {
                res.send(family);
                res.end();
              }
            }
          );
        }
      );
    });
    connection.release();
  });
});

app.put("/api/family/description", (req, res) => {
  const token = req.cookies.userAuth;
  if (!token) return res.status(200).send(false).end();
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) throw err;
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT FAMILY FROM Accounts WHERE USER_ID='${user.user_id}'`,
        (err, data) => {
          if (err) throw err;
          connection.query(
            `UPDATE Families SET DESCRIPTION='${req.body.description}' WHERE FAMILY_ID='${data[0].FAMILY}'`,
            (err, response) => {
              if (err) throw err;
              res.send(true).end();
            }
          );
        }
      );
      connection.release();
    });
  });
});

app.put("/api/family/leave", (req, res) => {
  const token = req.cookies.userAuth;
  if (!token) return res.status(200).send(false).end();
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) throw err;
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT FAMILY FROM Accounts WHERE USER_ID='${user.user_id}'`,
        (err, data) => {
          if (err) throw err;
          if (data[0].FAMILY === null) {
            res.send(false).end();
          } else {
            connection.query(
              `UPDATE Accounts SET FAMILY=null WHERE USER_ID='${user.user_id}'`,
              (err, response) => {
                if (err) throw err;
                res.send(true).end();
              }
            );
          }
        }
      );
    });
  });
});

module.exports = app;
