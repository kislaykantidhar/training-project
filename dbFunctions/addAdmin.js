const {Admin}=require('../models');

let  addAdmin= async (name,email,password)=>{
   return Admin.create({name:name,emailid:email,password:password});
       
}
module.exports={addAdmin:addAdmin}