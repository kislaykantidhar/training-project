const express=require('express');
let router=express.Router();

let {logInAdmin}=require('../dbFunctions/logInAdmin')
let {validPassword}=require('../services/validPassword')
let {createToken}=require('../services/createToken');

router.post('/login/Admin',(req,res)=>{
    if(req.body.email===undefined||req.body.password===undefined)
    {
        res.sendStatus(403);
    }
    else
    {
       let {email,password}=req.body;
       logInAdmin(email)
       .then(val=>{
           if (val==null)
           {
               res.json({msg:"Your email Id or password is invalid"})
           }
           else
           {
                 validPassword(password,val.password)
                .then(isValid=>{
                    if(isValid)
                    {   
                        let data={
                            name:val.name,
                            email:val.emailid,
                            id:val.id
                        }
                        let token=createToken(data)
                        res.json({msg:"welcome",token:token});
                    }
                    else{
                        res.json({msg:"Your email Id or password is invalid"})
                    }
                    })
                
           }
       })
       
        .catch(err=>{
           res.json({msg:err});
       })
    }
})

module.exports=router;