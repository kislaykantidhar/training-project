const jwt=require('jsonwebtoken');
const { options } = require('../routes/loginAdmin');
let createToken=(data)=>{
    let token=jwt.sign(data,"UnsafeBuild",{algorithm: "HS256"});
    return token;
}

module.exports={createToken:createToken}
