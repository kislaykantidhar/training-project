const express=require('express');
const signupU = require('../business_logic/signupU');
const router=express.Router();

router.post('/signup/User',(req,res)=>{
    signupU(req,res);
})

module.exports=router;