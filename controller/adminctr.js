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
    });
    try {
      const result = await article.save();
      console.log("saved");
      // console.log(result);
      res.redirect(`/articles/${result._id}`);
    } catch (e) {
      console.log("article new post");
      console.log(e);
    }
  };
  module.exports.getnew = (req, res, next) => {
    console.log("/new get");
    res.render("articles/new", { title: "", description: "", markdown: "" });
  };