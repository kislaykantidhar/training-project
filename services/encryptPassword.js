const bcrypt=require('bcrypt');
const saltRounds = 10;
let encryptPassword= async (password)=>{
    return bcrypt.hash(password,saltRounds);
}

module.exports={encryptPassword:encryptPassword};