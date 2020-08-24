const express=require('express');
let router=express.Router();




let extractToken=require('../middleware/extractToken');
const view_task = require('../middleware/view_task');

router.get('/view/Tasks',extractToken,(req,res)=>{
    view_task(req,res);
})

module.exports=router;