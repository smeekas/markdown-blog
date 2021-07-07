const express = require("express");

const router = express.Router();
const authController = require("../controller/authctr");
const { body } = require("express-validator");
const User = require("../models/user");
router.get("/signup", authController.getsignup);
router.post(
  "/signup",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),

  authController.postsignup
);
router.get("/login", authController.getlogin);
router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
  authController.postlogin
);
router.get("/logout", authController.getlogout);

module.exports = router;

// .custom(value=>{
//     User.find({email:value}).then(user=>{
//         if(user){
//             return Promise.reject('email already exists');
//         }
//     })
// }).withMessage('email already exists')
