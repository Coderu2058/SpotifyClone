const jwt=require("jsonwebtoken");
require("dotenv").config();

exports={}
exports.getToken=(email,user)=>{
    const token=jwt.sign({identifier:user._id},process.env.SECRET_KEY);
    return token;
}

module.exports=exports;