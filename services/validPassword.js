const bcrypt=require('bcrypt');
let validPassword=async(password,encrpyted)=>{
    return bcrypt.compare(password,encrpyted)
}
module.exports={validPassword:validPassword};