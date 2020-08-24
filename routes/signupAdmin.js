const express=require('express');
const signupA = require('../middleware/signupA');
router=express.Router();


router.post('/signup/Admin',(req,res)=>{
    signupA(req,res);
    
    
})

module.exports=router;