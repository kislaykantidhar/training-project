const express=require('express');
const router=express.Router();
const {userSignUpSchema}=require('../schemas/userSignUpSchema');
const {encryptPassword}=require('../services/encryptPassword');
const {addUser}=require('../dbFunctions/addUser');
const Ajv=require('ajv');
const ajv=new Ajv();

router.post('/signupUser',(req,res)=>{
    if(req.body.name===undefined||req.body.email===undefined||req.body.password===undefined)
    res.sendStatus(403);
    else{
        req.body.name=req.body.name.trim();
        req.body.password=req.body.password.trim();
        req.body.email=req.body.email.trim();
        let userSignUpValidate=ajv.compile(userSignUpSchema);
        let validate=userSignUpValidate(req.body);
        if(validate)
        {
            let {name,email,password}=req.body;
            encryptPassword(password).then(encrypted=>{
                addUser(name,email,encrypted).then(()=>{
                    res.json({msg:"signed up successfully"});
                }).catch((error)=>{
                    res.json({msg:error.errors[0].message});
                })
            })
        }
        else
        {
            res.json({msg:userSignUpValidate.errors[0].dataPath.slice(1)+" "+userSignUpValidate.errors[0].message});
        }
    }
})

module.exports=router;