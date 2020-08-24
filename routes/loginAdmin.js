const express=require('express');
const loginA = require('../middleware/loginA');
let router=express.Router();

router.post('/login/Admin',(req,res)=>{
    loginA(req,res);
})

module.exports=router;