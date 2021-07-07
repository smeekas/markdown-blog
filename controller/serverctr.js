const Article = require("../models/article");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
 
module.exports = async (req, res, next) => {
  const page = +req.query.page || 1;
  const ITEMS_P_PAGE = 3;
  let totalArticles = await Article.find().countDocuments();
  totalArticles= Number(totalArticles);
  const articles = await Article.find()
    .skip((page - 1) * ITEMS_P_PAGE)
    .limit(ITEMS_P_PAGE)
    .sort({ createdAt: "desc" });

  res.render("index.ejs", {
    
    articles: articles,
    totalArticles: totalArticles,
    nextPage: page + 1,
    prevPage: page - 1,
    currPage: page,
    hasNextPage: page * ITEMS_P_PAGE < totalArticles,
    hasPrevPage: page > 1,
    lastPage: Math.ceil(totalArticles / ITEMS_P_PAGE),
    path:""
  });
};
