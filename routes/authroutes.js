const express=require('express');

const router=express.Router();
const authController=require('../controller/authctr');

router.get('/signup',authController.getsignup);
router.post('/signup',authController.postsignup);
router.get('/login',authController.getlogin);
router.post('/login',authController.postlogin);
router.get('/logout',authController.getlogout);

module.exports=router;