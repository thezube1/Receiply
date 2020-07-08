const express = require("express");
const app = express();
const SQLHandlers = require("./modules/sqlHandler");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(SQLHandlers);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
