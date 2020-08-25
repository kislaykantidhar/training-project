const express=require('express');
const signupA = require('../business_logic/signupA');
router=express.Router();


router.post('/signup/Admin',(req,res)=>{
    signupA(req,res);
    
    
})

module.exports=router;