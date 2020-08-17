const {User}=require('./tabledefination');
let getUserId=async(email)=>{
    return User.findOne({attributes:['id'],where:{emailid:email}});
}
module.exports={getUserId:getUserId};