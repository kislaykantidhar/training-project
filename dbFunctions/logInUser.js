const {User}=require('../models')
let logInUser=async (email)=>{
    return await User.findOne({where:{emailid:email}})
}
module.exports={logInUser:logInUser}