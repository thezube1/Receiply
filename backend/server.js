const express = require("express");
const app = express();
const AccountHandlers = require("./modules/AccountHandlers");
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(AccountHandlers);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
