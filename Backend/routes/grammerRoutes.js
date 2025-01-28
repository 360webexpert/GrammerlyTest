const express = require("express");
const GrammarController = require("../controllers/grammerController");

const router = express.Router();

router.post("/check", GrammarController.checkGrammer);

module.exports = router;