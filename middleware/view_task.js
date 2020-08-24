let {verifyToken}=require('../services/verifyToken');
let {Task}=require('../models');
let showAssignedTasks=async(uid)=>{
    return await Task.findAll({attributes:['id','title','summary','created_at'],where:{
        assigned_to:uid
    }})
}
let view_task=(req,res)=>{
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
}
module.exports=view_task;