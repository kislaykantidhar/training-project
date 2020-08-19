const express=require('express');
let router=express.Router();
let {verifyToken}=require('../services/verifyToken');
let {showAssignedTasks}=require('../dbFunctions/showAssignedTasks');



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

router.get('/viewTasks',extractToken,(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {
        showAssignedTasks(decoded.id)
        .then((val)=>{
            
            if (val[0]==null)
            {
                res.json({msg:"No task is assigned to you yet"})
            }
            else
            {
                let val2=[];
                let buff;
                for (let obj of val)
                {
                    buff=obj.dataValues;
                    buff.comment_at="http://localhost:5227/comment?task_id="+obj.dataValues.id;
                    buff.logTime_at="http://localhost:5227/logtime?task_id="+obj.dataValues.id;
                    val2.push(buff);

                }
                res.json({msg:val2}); 
            }
            
        })
        .catch(err=>{
            res.json({msg:err})
        })
    }
})

module.exports=router;