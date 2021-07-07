const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleRoutes = require("./routes/articlesroutes.js");
const adminRoutes = require("./routes/adminroutes.js");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path=require('path');
const authRoutes = require("./routes/authroutes.js");
const Article = require("./models/article");
const User = require("./models/user");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"css")));

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
  console.log("middle",await req.session.isLoggedIn);
  console.log("middle",await req.session.isLoggedIn);
  res.locals.isAuthenticated=await req.session.isLoggedIn;
  next(); 
})
const serverController=require('./controller/serverctr');
app.get("/", serverController);
app.use("/articles", articleRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use((req, res, next) => {
  res.render("404.ejs",{path:null});
});
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(process.env.PORT||3000);
    console.log("connected..");
  }
);
//!protect routes using middleware✅
//! add admin blogs list and delete & edit✅
//! navbar styling✅
//! navbar active link✅
//! error checking and validation(sign up & login)(with express-validator and boostrap alert)✅
//!  security
//!500 error
//! preview of markdown
//! search based on title
//! pagination✅
//! blogs per page filter
//! sort based on views, date
//! impression server side✅
//! mobile view button fix in admin (read more, edit, delete)✅