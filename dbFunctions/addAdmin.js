const {Admin} =require('../dbFunctions/tabledefination');

let  addAdmin= async (name,email,password)=>{
   return Admin.create({name:name,emailid:email,password:password});
       
}
module.exports={addAdmin:addAdmin}