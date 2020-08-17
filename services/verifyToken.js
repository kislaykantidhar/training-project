const jwt=require('jsonwebtoken');
let verifyToken=(token)=>{
    try {
        return jwt.verify(token,"UnsafeBuild");
    } catch (error) {
        return undefined;
    }
    
}
module.exports={verifyToken:verifyToken}