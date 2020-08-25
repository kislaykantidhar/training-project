const express=require('express');
let router=express.Router();

let extractToken=require('../middleware/extractToken');
const show_comments = require('../business_logic/show_comments');

router.get('/view/Comments',extractToken,(req,res)=>{
    show_comments(req,res);
})

module.exports=router;