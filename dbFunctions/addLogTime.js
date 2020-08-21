const {LogTime}=require('../models');
let addLogTime=async(taskid,date,startedAt,endedAt)=>{
    return LogTime.create({taskid:taskid,date:date,startedAt:startedAt,endedAt:endedAt});
}

module.exports={addLogTime:addLogTime}