const express=require('express');
let router=express.Router();
const {verifyToken}=require('../services/verifyToken');
const {getComments}=require('../dbFunctions/getComments');

let extractToken=(req,res,next)=>{
    const bearerHeader=req.headers['authorization'];
    // console.log(bearerHeader)
    if(bearerHeader)
    {
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

router.get('/showComments',extractToken,(req,res)=>{
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