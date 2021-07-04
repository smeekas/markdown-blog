
const Article = require("../models/article");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

module.exports.postnew = async (req, res, next) => {
    console.log("/new post");
    const title = req.body.title;
    const description = req.body.description;
    const markdown = req.body.markdown;
  
    if (!title || !description || !markdown) {
      return res.render("articles/new.ejs", {
        title: title,
        description: description,
        markdown: markdown,
      });
    }
    const sanitized = dompurify.sanitize(marked(markdown));
    const article = new Article({
      title: title,
      description: description,
      markdown: markdown,
      sanitized: sanitized,
      userId:req.user._id,
    });
    try {
      const result = await article.save();
      console.log("saved");
      // console.log(result);
      res.redirect(`/admin/articles`);
    } catch (e) {
      console.log("article new post");
      console.log(e);
    }
  };
  module.exports.getnew = (req, res, next) => {
    console.log("/new get");
    res.render("articles/new", { title: "", description: "", markdown: "" });
  };

  module.exports.getarticles=async (req,res,next)=>{
    try{
      const articles=await Article.find({userId:req.session.user._id});
      // console.log(articles);
      res.render('admin/index',{
        articles:articles
      })
    }catch(e){
      console.log("admin getArticles");
    }
  }

  
module.exports.postedit = async (req, res, next) => {
  console.log("post edit");
  const article = await Article.findById(req.params.id);

  article.title = req.body.title;
  if(req.session.user._id.toString()!==article.userId.toString()){
    return res.redirect('/');
  }
  article.description = req.body.description;
  article.markdown = req.body.markdown;
  const sanitized = dompurify.sanitize(marked(req.body.markdown));
  article.sanitized = sanitized;
  await article.save();
  res.redirect("/admin/articles");
};

module.exports.getedit = async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  if(req.session.user._id.toString()!==article.userId.toString()){
    return res.redirect('/');
  }
  res.render("articles/edit", { article: article });
};
module.exports.postdelete = async (req, res, next) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

