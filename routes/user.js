const express = require("express");
const { createNewUser } = require("../controllers/user");
const router = express.Router();

router
  .route("/")
  .get((req, res) => res.send("OK"))
  .post(createNewUser);

module.exports = router;
