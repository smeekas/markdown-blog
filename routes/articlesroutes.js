const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const articlecontroller = require("../controller/articlectr");
router.post("/edit/:id", articlecontroller.postedit);
router.get("/edit/:id", articlecontroller.getedit);

router.post("/delete/:id", articlecontroller.postdelete);
router.get("/:id", articlecontroller.getarticle);
module.exports = router;
