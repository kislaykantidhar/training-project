const express=require('express');
router=express.Router();
const {adminSignUpSchema}=require('../schemas/adminSignUpSchema');
const {addAdmin}=require('../dbFunctions/addAdmin')
const {encryptPassword}=require('../services/encryptPassword');
const Ajv=require('ajv');
const ajv=new Ajv();
router.post('/signupAdmin',(req,res)=>{
    // console.log(req.body);
    if(req.body.name===undefined||req.body.email===undefined||req.body.password===undefined)
    res.sendStatus(403);
    else
    {
        req.body.name=req.body.name.trim();
        req.body.password=req.body.password.trim();
        req.body.email=req.body.email.trim();
        let adminSignUpValidate=ajv.compile(adminSignUpSchema)
        let validate=adminSignUpValidate(req.body)
        if(validate)
        {
            let {name,email,password}=req.body;
            encryptPassword(password).then(encrypted=>{
                addAdmin(name,email,encrypted).then(()=>{
                    res.json({msg:"signed up successfully"});
                }).catch((error)=>{
                    res.json({msg:error.errors[0].message});
                })
            })
        }
        else
        {
            res.json({msg:adminSignUpValidate.errors[0].dataPath.slice(1)+" "+adminSignUpValidate.errors[0].message});
        }
        
    }
    
})

module.exports=router;