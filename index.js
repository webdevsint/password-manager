const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function updateUserList(userList) {
  fs.writeFileSync(path.resolve("./data/users.json"), JSON.stringify(userList));
}

app.use("/", require("./router"));

app.listen(8000, () => {
  console.log("Server started on port:8000");
});
