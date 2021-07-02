const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminctr');
router.get('/new',adminController.getnew);

module.exports=router;