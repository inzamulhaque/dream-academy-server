const express = require("express");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const uploader = require("../middleware/uploader");
const { addBlog } = require("../controllers/blog");
const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    (req, res, next) => auth(req, res, next, "mentor", "admin"),
    uploader.single("image"),
    addBlog
  );

module.exports = router;
