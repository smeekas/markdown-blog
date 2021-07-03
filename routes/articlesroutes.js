const express = require("express");
const router = express.Router();
const articlecontroller = require("../controller/articlectr");

router.get("/:id", articlecontroller.getarticle);
module.exports = router;
