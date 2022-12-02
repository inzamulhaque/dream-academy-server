const express = require("express");
const {
  createNewUser,
  verifyUser,
  signIn,
  forgotPassword,
  resetPassword,
  getAllUser,
  updateUserRole,
} = require("../controllers/user");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .get(
    "/alluser",
    verifyToken,
    (req, res, next) => auth(req, res, next, "admin"),
    getAllUser
  )
  .post("/signup", createNewUser)
  .post("/signin", signIn)
  .post("/forgotpassword", forgotPassword)
  .patch(
    "/updaterole",
    verifyToken,
    (req, res, next) => auth(req, res, next, "admin"),
    updateUserRole
  );

router.route("/verify/:token").get(verifyUser);

router.route("/resetpass/:token").patch(resetPassword);

module.exports = router;
