const express = require("express");
const { createNewUser, verifyUser, signIn } = require("../controllers/user");
const router = express.Router();

router.post("/signup", createNewUser).post("/signin", signIn);

router.route("/verify/:token").get(verifyUser);

module.exports = router;
