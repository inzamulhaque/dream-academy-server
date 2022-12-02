const express = require("express");
const {
  createNewCourse,
  getAllCourse,
  getCourseById,
} = require("../controllers/course");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    (req, res, next) => auth(req, res, next, "admin"),
    createNewCourse
  )
  .get(getAllCourse);

router.route("/:id").get(verifyToken, getCourseById);

module.exports = router;
