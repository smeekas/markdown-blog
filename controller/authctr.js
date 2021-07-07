const Article = require("../models/article");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports.getsignup = (req, res, next) => {
  res.render("auth/signup", { errors: false, email: "", password: "" });
};

module.exports.getlogin = (req, res, next) => {
  res.render("auth/login", { errors: false, email: "", password: "" });
};

module.exports.postsignup = async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log(errors.array());
    // return;
    return res.render("auth/signup", {
      errors: true,
      email: email,
      password: pass,
      errorMessage: errors.array(),
    });
  }
  const usercheck = await User.find({ email: email });
//   console.log(usercheck);
  if (usercheck.length>0) {
    return res.render("auth/signup", {
      errors: true,
      email: email,
      password: pass,
      errorMessage: [{ msg: "email already exists" }],
    });
  }
  const hashed = await bcrypt.hash(pass, 5);
  const user = await new User({
    email: email,
    password: hashed,
    posts: [],
  });

  try {
    const result = await user.save();
    if (!result) {
      return;
    }
    res.redirect("/auth/login");
  } catch (e) {
    console.log("post signup");
  }
};

module.exports.postlogin = async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  const errors=validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array());
    // return;
    return res.render("auth/login", {
      errors: true,
      email: email,
      password: pass,
      errorMessage: errors.array(),
    });
  }
  try {
    const user = await User.findOne({ email: email });
    // console.log(user);
    if (!user) {
      // throw new Error("no user found!");
      return res.render("auth/login",{
          errors:true,
          email:email,
          password:pass,
          errorMessage:[{msg:'no user found with given email'}]
      });
    }
    const hashed = user.password;
    const equal = await bcrypt.compare(pass, hashed);
    console.log("equal", equal);
    if (equal) {
      req.session.user = await user;
      req.session.isLoggedIn = await true;
      await req.session.save();
      return await res.redirect("/");
    } else {
      return res.render("auth/login",{
        errors:true,
        email:email,
        password:pass,
        errorMessage:[{msg:'Wrong password'}]
      });
    }
  } catch (e) {
    console.log(e);
    // console.log("post login");
  }
};
module.exports.getlogout = async (req, res, next) => {
  await req.session.destroy();
  res.redirect("/");
};
