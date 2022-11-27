const express = require("express");
const { addTutorial } = require("../controllers/tutorial");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    (req, res, next) => auth(req, res, next, "mentor", "admin"),
    addTutorial
  );

module.exports = router;
