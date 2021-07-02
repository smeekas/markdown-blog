const Article=require('../models/article');
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);


module.exports.postedit = async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  article.title = req.body.title;
  article.description = req.body.description;
  article.markdown = req.body.markdown;
  const sanitized = dompurify.sanitize(marked(req.body.markdown));
  article.sanitized = sanitized;
  await article.save();
  res.redirect("/");
};

module.exports.getedit = async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
};
module.exports.getarticle = async (req, res, next) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  if (!article) {
    return res.redirect("/");
  }
  res.render("articles/show", { article: article });
};

module.exports.postdelete = async (req, res, next) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
};


