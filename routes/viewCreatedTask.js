const express=require('express');
const router=express.Router();


let extractToken=require('../middleware/extractToken');
const view_created_task = require('../middleware/view_created_task');

router.get('/view/CreatedTask',extractToken,(req,res)=>{
    view_created_task(req,res);
})


module.exports=router;