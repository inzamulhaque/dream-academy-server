const express = require("express");
const { payment } = require("../controllers/payment");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", verifyToken, payment);

module.exports = router;
