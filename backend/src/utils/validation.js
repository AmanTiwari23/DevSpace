
const validator = require("validator")

const validateSignupData = (req)=>{
    const{firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter valid first name and last name");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
};

module.exports = { validateSignupData,}