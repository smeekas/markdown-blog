const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleRoutes = require("./routes/articlesroutes.js");
const adminRoutes = require("./routes/adminroutes.js");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const authRoutes = require("./routes/authroutes.js");
const Article = require("./models/article");
const User = require("./models/user");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));

const MONGODB_URI = "mongodb+srv://smeet:smeet@cluster0.uyisx.mongodb.net/blog";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);
app.use(async (req, res, next) => {
  // console.log(req.session.user)
  if (!req.session.user) {
    return next();
  } else {
    try {
      const user = await User.findById(req.session.user._id);
      if (!user) {
        return next();
      }
      req.user = await user; //to use mongoose methods
      next();
    } catch (e) {
      console.log("middleware");
      next(Error(e));
    }
  }
});

app.use(async (req,res,next)=>{
  console.log("middle",req.session.isLoggedIn);
  res.locals.isAuthenticated=await req.session.isLoggedIn;
  next(); 
})
app.get("/", async (req, res, next) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("index.ejs", {
    articles: articles,
  });
});
app.use("/articles", articleRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use((req, res, next) => {
  res.render("404.ejs");
});
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(process.env.PORT||3000);
    console.log("connected..");
  }
);
//!protect routes using middleware
//! add admin blogs list and delete & edit
//! navbar
//! may be upvote 
//! error checking and validation