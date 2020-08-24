const express=require('express');
const router=express.Router();

let extractToken=require('../middleware/extractToken');
const log_time = require('../middleware/log_time');

router.get('/logtime',extractToken,(req,res)=>{
    log_time(req,res);
})


module.exports=router;