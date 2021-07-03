const Article=require('../models/article');
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);


module.exports.getarticle = async (req, res, next) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  if (!article) {
    return res.redirect("/");
  }
  res.render("articles/show", { article: article });
};


