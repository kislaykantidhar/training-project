const {verifyToken}=require('../services/verifyToken');
let {Comment}=require('../models')
let getComments=async(taskid)=>{
    return await Comment.findAll({where:{taskid:taskid}});

}

let show_comments=(req,res)=>{
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

}
module.exports=show_comments;