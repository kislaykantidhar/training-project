const express=require('express');
const router=express();

let extractToken=require('../middleware/extractToken');
const loga = require('../business_logic/loga');

router.get('/logs',extractToken,(req,res)=>{
    loga(req,res);
})

module.exports=router;