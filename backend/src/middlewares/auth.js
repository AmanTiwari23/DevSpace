const jwt = require("jsonwebtoken");
const User = require("/Users/Ram Bharat Tiwari/Desktop/DevSpace/backend/models/user")

const userAuth = async(req,res,next)=>{
  try{
   const {token} =  req.cookies;

   if(!token){
      throw new Error("token is not valid");
   }

   const decodedObj = await jwt.verify(token,"Aman@9589");

   const {_id} = decodedObj;
   const user = await User.findById(_id);

   if(!user){
      throw new Error("User not found");
   }

   req.user = user
   next();

  }catch(err){
   res.status(400).send("ERROR "+err.message);
  }
 
}


module.exports = { userAuth};