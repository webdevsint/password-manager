const express = require("express");
const router = express.Router();

// create a user
router.post("/sign-up", (req, res) => {
  const userList = require("./data/users.json");

  userList.push({
    email: req.body.email,
    masterKey: req.body.masterKey,
    vault: [],
  });

  updateUserList(userList);

  res.send("user added");
});

// find a user
router.get("/user/:uid", (req, res) => {
  const userList = require("./data/users.json");

  const user = userList.filter((u) => u.email === req.params.uid);

  if (user.length === 0) {
    res.send("This user was not found!");
  } else {
    res.send(user);
  }
});

// add password to vault
router.post("/vault/:uid", (req, res) => {
  const userList = require("./data/users.json");

  const userIndex = userList.findIndex((obj) => obj.email === req.params.uid);

  function addNewPassword(userList, userIndex, res) {
    userList[userIndex].vault.push({
      url: req.body.url,
      identifier: req.body.identifier,
      password: req.body.password,
    });

    updateUserList(userList);

    res.send("Password added to vault!");
  }

  if (userIndex === -1) {
    res.send("This user was not found!");
  } else {
    const filteredList = userList[userIndex].vault.filter(
      (obj) => obj.url === req.body.url
    );

    if (filteredList.length > 0) {
      if (
        userList[userIndex].vault.filter(
          (obj) => obj.identifier === req.body.identifier
        ).length === 1
      ) {
        const identifierIndex = filteredList.findIndex(
          (obj) => obj.identifier === req.body.identifier
        );

        filteredList[identifierIndex].password = req.body.password;

        updateUserList(userList);

        res.send("Password updated!");
      } else {
        addNewPassword(userList, userIndex, res);
      }
    } else {
      addNewPassword(userList, userIndex, res);
    }
  }
});

module.exports = router;
