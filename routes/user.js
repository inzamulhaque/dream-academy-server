const express = require("express");
const { createNewUser, verifyUser } = require("../controllers/user");
const router = express.Router();

router
  .route("/")
  .get((req, res) => res.send("OK"))
  .post(createNewUser);

router.route("/verify/:token").get(verifyUser);

module.exports = router;
