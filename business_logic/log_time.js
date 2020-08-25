let {verifyToken} =require('../services/verifyToken')
let {Task}=require('../models');
let {LogTime}=require('../models');
let {timeSchema}=require('../schemas/timeSchema');
let {Logsummary}=require('../models');

let taskRow=async(id)=>{
    return  await Task.findByPk(id)
}

// let addLogTime=async(taskid,date,startedAt,endedAt,timeSpent)=>{
   
//         return LogTime.create({taskid:taskid,date:date,startedAt:startedAt,endedAt:endedAt,timeSpent:timeSpent}); 

     
// }
let moment=require('moment');


let log_time=(req,res)=>{
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
                    let start=moment(req.body.startedAt,"hh:mm");
                    let end=moment(req.body.endedAt,"hh:mm");
                    let duration=parseInt(end.diff(start,'hour'));
                    LogTime.create({taskid:taskid,date:today,startedAt:req.body.startedAt,endedAt:req.body.endedAt,timeSpent:duration})
                    .then(fullfilled=>{
                       
                        Logsummary.create({summary:req.body.summary,LogTimeId:fullfilled.dataValues.id})
                        .then(vali=>{
                            res.json({msg:"Time Logged!"})
                        })
                        .catch(err=>{
                            res.json({msg:err});
                        })

                    
                        
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

}
module.exports=log_time;