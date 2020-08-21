let express=require('express');
const { request } = require('chai');
let router= express.Router();
let {verifyToken}=require('../services/verifyToken');
let moment=require('moment');
let {taskRow}=require('../dbFunctions/taskRow')
let {postComments}=require('../dbFunctions/postComment')

let extractToken=require('../middleware/extractToken')

router.get('/comment',extractToken,(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {
        let taskid=req.query.task_id;
        
        taskRow(taskid)
        .then((val)=>{
            if(val==null)
            {
                res.json({msg:"no such task made"})
            }
            else if(val.assigned_to==decoded.id)
            {
                if (req.body.comment==undefined||req.body.comment==null)
                {
                    res.json({msg:"there is no comment to post"});
                }
                else if(req.body.comment.trim().length==0)
                {
                    res.json({msg:"there is no comment to post"});
                }
                else
                {
                    let time=moment();
                    time=time.format("YYYY-MM-DD HH:mm:ssZ");
                    postComments({taskid:taskid,time:time,comment:req.body.comment.trim(),commented_by:decoded.id})
                    .then(val=>{
                        res.json({msg:"Comment posted"})
                    })
                    .catch(err=>
                        {
                            res.json({msg:err})
                        })
                    
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