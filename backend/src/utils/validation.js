
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

const validateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];

    const isEditAllowed = Object.keys(req.body).every((field)=> allowedEditFields.includes(field));
    return isEditAllowed;

}

module.exports = { validateSignupData,validateEditProfileData};