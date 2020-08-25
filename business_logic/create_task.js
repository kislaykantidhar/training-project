const moment=require('moment');
const {verifyToken}=require('../services/verifyToken');
const {taskSchema}=require('../schemas/taskSchema');
const {Task}=require('../models');
const {User}=require('../models');

let addTask= async(model)=>{
    return Task.create({created_by:model.created_by,title:model.title_of_task,summary:model.summary_of_the_task,assigned_to:model.assigned_to,created_at:model.created_at,status:model.status})
}

let getUserId=async(email)=>{
    return await User.findOne({attributes:['id'],where:{emailid:email}});
}

let create_task=(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {   if (req.body.title===undefined||req.body.summary===undefined)
        {
            res.sendStatus(403);
        }
        else
        {
            req.body.title=req.body.title.trim();
            req.body.summary=req.body.summary.trim();
        }
        if(req.body.assignedTo!==undefined)
        req.body.assignedTo=req.body.assignedTo.trim();
        let {error,value}=taskSchema.validate(req.body);
        if(error==undefined)
        {
                let created_by,title_of_task,summary_of_the_task,assigned_to,created_at,status;
                created_by=decoded.id;
                title_of_task=req.body.title;
                summary_of_the_task=req.body.summary;
                let now=moment();
                created_at=now.format("YYYY-MM-DD");
                if(req.body.assignedTo===undefined)
                {
                    assigned_to=null;
                    status="unassigned";
                    let model={
                        created_by:created_by,
                        title_of_task:title_of_task,
                        summary_of_the_task:summary_of_the_task,
                        assigned_to:assigned_to,
                        created_at:created_at,
                        status:status}
                    addTask(model)
                    .then(()=>{
                        res.json({msg:"Task created successfully"})
                    })
                    .catch((err)=>{
                        res.json({msg:err})
                    })


                }
                else{
                    getUserId(req.body.assignedTo)
                    .then((val)=>{
                        if (val==null)
                        {
                            res.json({msg:"The user email doesnot exist"});
                        }
                        else
                        {
                            assigned_to=val.dataValues.id;
                            status="assigned";
                        
                            let model={
                                created_by:created_by,
                                title_of_task:title_of_task,
                                summary_of_the_task:summary_of_the_task,
                                assigned_to:assigned_to,
                                created_at:created_at,
                                status:status}
                            return addTask(model);
                        }
                        
                        })
                    .then(()=>{
                        res.json({msg:"Task created successfully"})
                    })
                    .catch((err)=>{
                        res.json({msg:err})
                    })
                }
        
        }
        else
        {
            res.json({msg:error.details[0].message})
        }
        
    }
}
module.exports=create_task;