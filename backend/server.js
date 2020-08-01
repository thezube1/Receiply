const express = require("express");
const app = express();
const AccountHandlers = require("./modules/AccountHandlers");
const GetInfo = require("./modules/GetInfo");
const FamilyHandlers = require("./modules/FamilyHandlers");
const InviteHandlers = require("./modules/InviteHandlers");
const RecipeHandlers = require("./modules/RecipeHandlers");
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(AccountHandlers);
app.use(GetInfo);
app.use(FamilyHandlers);
app.use(RecipeHandlers);
app.use(InviteHandlers);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
