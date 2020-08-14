const jwt=require('jsonwebtoken');

let createToken=(data)=>{
    let token=jwt.sign(data,"UnsafeBuild",{algorithm: "HS256"});
    return token;
}

module.exports={createToken:createToken}
