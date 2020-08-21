const {User}=require('../models')
let getUserId=async(email)=>{
    return await User.findOne({attributes:['id'],where:{emailid:email}});
}
module.exports={getUserId:getUserId};