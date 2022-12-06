const express = require("express");
const { createTestimonial } = require("../controllers/testimonial");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    (req, res, next) => auth(req, res, next, "student", "mentor"),
    createTestimonial
  );

module.exports = router;
