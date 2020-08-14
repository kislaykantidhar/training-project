const {User}=require('./tabledefination');

let addUser=async(name,email,password)=>{
    return User.create({name:name,emailid:email,password:password});

}
module.exports={addUser:addUser}