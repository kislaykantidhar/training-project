const moment=require('moment');
const {verifyToken}=require('../services/verifyToken');
let {LogTime}=require('../models')
let getLogDetails= async(taskid)=>{
    return await LogTime.findAll({where:{taskid:taskid}})
}
let loga=(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {
        let taskid=req.query.task_id;
        getLogDetails(taskid)
        .then(val=>{
            if (val[0]!=null)
            {
                let nval=[], buff;
                let duration;
                for (let logs of val)
                {
                    buff=logs.dataValues;
                    let start=moment(buff.startedAt,"hh:mm:ss");
                    let end=moment(buff.endedAt,"hh:mm:ss");
                    duration=moment.duration(end.diff(start));
                    buff.duration=duration.as('hour')+"hrs";
                    nval.push(buff);
                }
                res.json({msg:nval});
            }
            else
            res.json({msg:"No logs for this task"})
        })
        .catch(err=>{
            res.json({msg:err})
        })
    }

}
module.exports=loga;