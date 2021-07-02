const Article=require('../models/article');
const User=require('../models/user');

module.exports.getsignup=(req,res,next)=>{
    res.render('auth/signup');
}

module.exports.getlogin=(req,res,next)=>{
    res.render('auth/login');
}

module.exports.postsignup=async (req,res,next)=>{
    const email=req.body.email;
    const pass=req.body.password;
    const user=new User({
        email:email,
        password:pass,
        posts:[]
    });

    try{
const result=await user.save();
if(!result){
    return;
}
res.redirect('/auth/login');
    }catch(e){
        console.log("post signup");
    }


}

module.exports.postlogin=async (req,res,next)=>{
    const email=req.body.email;
    const pass=req.body.password;
    
    try{
    const user=await User.findOne({email:email});
    console.log(user._doc)
    if(!user){
        throw new Error("no user found!");
    }
    if(user.password===pass){
        req.session.user=await user;
        req.session.isLoggedIn=await true;
        await req.session.save();
        return await res.redirect('/');
    }else{
        return res.redirect('/auth/login');
    }
}catch(e){
console.log(e)
    // console.log("post login");
}

}
module.exports.getlogout=async (req,res,next)=>{
    await req.session.destroy();
    res.redirect('/');
}
