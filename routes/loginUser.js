const express=require('express');
const loginU = require('../middleware/loginU');
const router=express.Router();

router.post('/login/User',(req,res)=>{
    loginU(req,res);
})

module.exports=router;