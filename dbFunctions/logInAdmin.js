const {Admin}=require('../models');
let logInAdmin=async (email)=>{
    return await Admin.findOne({where:{emailid:email}});
    
}
module.exports={logInAdmin:logInAdmin}