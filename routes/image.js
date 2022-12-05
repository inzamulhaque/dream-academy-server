const express = require("express");
const { getImage } = require("../controllers/image");

const router = express.Router();

router.get("/:img", getImage);

module.exports = router;
