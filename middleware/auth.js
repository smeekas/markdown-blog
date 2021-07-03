module.exports=(req,res,next)=>{
    console.log("auth",req.session.isLoggedIn);
    if(!req.session.isLoggedIn){
        return res.render('auth/login.ejs');
    }
    next();
}