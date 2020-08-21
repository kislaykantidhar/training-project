const express=require('express');
const router=express();
const {verifyToken}=require('../services/verifyToken');
let {getLogDetails}=require('../dbFunctions/getLogdetails')
let extractToken=require('../middleware/extractToken')

router.get('/logs',extractToken,(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {
        let taskid=req.query.task_id;
        getLogDetails(taskid)
        .then(val=>{
            if (val[0]!=null)
            res.json({msg:val})
            else
            res.json({msg:"No logs for this task"})
        })
        .catch(err=>{
            res.json({msg:err})
        })
    }
})

module.exports=router;