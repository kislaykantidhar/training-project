const express=require('express');
const router=express();

let extractToken=require('../middleware/extractToken');
const loga = require('../middleware/loga');

router.get('/logs',extractToken,(req,res)=>{
    loga(req,res);
})

module.exports=router;