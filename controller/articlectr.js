const Article = require("../models/article");
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
  console.log(req.session);
  if (
    !req.session.user ||
    article.userId.toString() !== req.session.user._id.toString()
  ) {
    article.impression = article.impression + 1;
    article.save();
  }
  res.render("articles/show", { article: article ,path:"/"});
};
