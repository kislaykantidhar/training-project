const {adminSignUpSchema}=require('../schemas/adminSignUpSchema');
// const {addAdmin}=require('../dbFunctions/addAdmin')
const {Admin}=require('../models');
const {encryptPassword}=require('../services/encryptPassword');
let  addAdmin= async (name,email,password)=>{
    return Admin.create({name:name,emailid:email,password:password});
        
 }
let signupA=(req,res)=>{
    if(req.body.name===undefined||req.body.email===undefined||req.body.password===undefined)
    res.sendStatus(403);
    else
    {
        req.body.name=req.body.name.trim();
        req.body.password=req.body.password.trim();
        req.body.email=req.body.email.trim();
       
        let {error,value}=adminSignUpSchema.validate(req.body)
        if(error===undefined)
        {
            let {name,email,password}=req.body;
            encryptPassword(password).then(encrypted=>{
                addAdmin(name,email,encrypted).then(()=>{
                    res.json({msg:"signed up successfully"});
                }).catch((err)=>{
                    res.json({msg:err.errors[0].message});
                })
            })
        }
        else
        {
            res.json({msg:error.details[0].message});
        }
        
    }
}
module.exports=signupA;