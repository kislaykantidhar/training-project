const express=require('express');
const router=express.Router();
const moment=require('moment');
const {verifyToken}=require('../services/verifyToken');
const {getAllTasksCreated}=require('../dbFunctions/getAllTasksCreated')

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

router.get('/viewCreatedTask',extractToken,(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {   
       getAllTasksCreated(decoded.id)
       .then(val=>{
           if(val[0]==null)
           {
               res.json({msg:" haven't created any tasks yet"})
           }
           else
           {
            let val2=[];
            let buff;
            for (let obj of val)
            {
                buff=obj.dataValues;
                buff.showComments="http://localhost:5227/showComments?task_id="+obj.dataValues.id;
                buff.logs="http://localhost:5227/logs?task_id="+obj.dataValues.id;
                val2.push(buff);

            }
            res.json({msg:val2}); 

           }

       })
    }
})


module.exports=router;