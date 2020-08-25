const express=require('express');
const loginA = require('../business_logic/loginA');
let router=express.Router();

router.post('/login/Admin',(req,res)=>{
    loginA(req,res);
})

module.exports=router;