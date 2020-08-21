const express=require('express');
const router=express.Router();
let {verifyToken} =require('../services/verifyToken')
let {taskRow}=require('../dbFunctions/taskRow')
let {timeSchema}=require('../schemas/timeSchema');
let {addLogTime}=require('../dbFunctions/addLogTime');


let moment=require('moment');
let extractToken=require('../middleware/extractToken')

router.get('/logtime',extractToken,(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {
        let taskid=req.query.task_id;
        taskRow(taskid)
        .then(val=>{
            if(val==null)
            {
                res.json({msg:"no such task made"})
            }
            else if(val.assigned_to==decoded.id)
            {
                let {error,value}=timeSchema.validate(req.body);
                if(error==null)
                {
                    let today=moment();
                    today=today.format("YYYY-MM-DD");
                    addLogTime(taskid,today,req.body.startedAt,req.body.endedAt)
                    .then(fullfilled=>{
                        res.json({msg:"Time Logged!"})
                    })
                    .catch(err=>{
                        res.json({msg:err});
                    })
                }
                else
                {
                    res.json({msg:error.details[0].message});
                }
                
            }
            else{
                res.sendStatus(403);
            }
        })
        .catch((err)=>{
            res.json({msg:err})
        })

    }
})

module.exports=router;