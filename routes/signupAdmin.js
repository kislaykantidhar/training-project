const express=require('express');
router=express.Router();
const {adminSignUp}=require('../services/adminSignUp');
const {addAdmin}=require('../dbFunctions/addAdmin')
const {encryptPassword}=require('../services/encryptPassword');
router.post('/signupAdmin',(req,res)=>{
    // console.log(req.body);
    if(req.body.name===undefined||req.body.email===undefined||req.body.password===undefined)
    res.sendStatus(403);
    else
    {
        if(adminSignUp(req.body))
        {
            let {name,email,password}=req.body;
            encryptPassword(password).then(encrypted=>{
                addAdmin(name,email,encrypted).then(()=>{
                    res.json({msg:"signed up successfully"});
                }).catch((error)=>{
                    res.json({msg:error});
                })
            })
        }
        else
        {
            res.json({msg:"please enter data properly"});
        }
        
    }
    
})

module.exports=router;