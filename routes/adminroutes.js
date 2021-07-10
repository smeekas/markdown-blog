const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminctr');
const auth=require('../middleware/auth');
const {body}=require('express-validator');
router.get('/new',auth,adminController.getnew);
router.post('/new',auth,adminController.postnew);
router.get('/articles',auth,adminController.getarticles);
router.post("/edit/:id",auth, adminController.postedit);
router.get("/edit/:id",auth, adminController.getedit);

router.post("/delete/:id",auth, adminController.postdelete);

module.exports=router;