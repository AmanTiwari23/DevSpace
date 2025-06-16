const adminAuth = ((req,res,next)=>{
   console.log("admin auth is getting checked");
   const token = "xyz";
   const isAdminAuthorized = token ==="xyz";
   if(!isAdminAuthorized){
    res.status(401).send("Unauthorized request");
   }else{
    next();
   }
});

const userAuth = ((req,res,next)=>{
   console.log("user Auth is getting checked");
   const token = "abc";
   const isUserAuthorized = token ==="abc";

   if(!isUserAuthorized){
      res.status(401).send("Unauthorized user");
   }else{
      next();
   }
})


module.exports = {adminAuth , userAuth};