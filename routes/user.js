const express = require("express");
const {
  createNewUser,
  verifyUser,
  signIn,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");
const router = express.Router();

router
  .post("/signup", createNewUser)
  .post("/signin", signIn)
  .post("/forgotpassword", forgotPassword);

router.route("/verify/:token").get(verifyUser);

router.route("/resetpass/:token").patch(resetPassword);

module.exports = router;
