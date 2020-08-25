const express=require('express');
const router=express.Router();

let extractToken=require('../middleware/extractToken');
const create_task = require('../business_logic/create_task');
 

router.get('/createTask',extractToken,(req,res)=>{
    create_task(req,res);
})


module.exports=router;