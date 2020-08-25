let express=require('express');
let router= express.Router();


let extractToken=require('../middleware/extractToken');
const commentu = require('../business_logic/commentu');

router.get('/comment',extractToken,(req,res)=>{
    commentu(req,res);       
})

module.exports=router;