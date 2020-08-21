const express=require('express');
let router=express.Router();
const {verifyToken}=require('../services/verifyToken');
const {getComments}=require('../dbFunctions/getComments');

let extractToken=require('../middleware/extractToken')

router.get('/view/Comments',extractToken,(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {
        let taskid=req.query.task_id;
        getComments(taskid)
        .then(val=>{
            if(val[0]==null)
            {
                res.json({msg:"There is no comment for this task"})
            }
            else
            {
                res.json({msg:val})
            }
        })
        .catch(err=>{
            res.json({msg:err});
        })
    }
})

module.exports=router;