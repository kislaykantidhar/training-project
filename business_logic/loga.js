const moment=require('moment');
const {verifyToken}=require('../services/verifyToken');
let {LogTime}=require('../models')
let {Logsummary}=require('../models');
const { Op } = require("sequelize");
let getLogDetails= async(taskid)=>{
    return  LogTime.findAll({where:{taskid:taskid},include:Logsummary})
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
               
                LogTime.sum('timeSpent', { where: { taskid: { [Op.eq]: taskid } } })
                .then(totalduration=>{
                    // totalduration:totalduration
                    res.json({msg:val,totalduration:totalduration})

                })
                .catch(err2=>{
                    res.json({msg:err2})
                })
                
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