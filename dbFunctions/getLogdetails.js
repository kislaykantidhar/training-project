let {LogTime}=require('./tabledefination');
let getLogDetails= async(taskid)=>{
    return LogTime.findAll({where:{taskid:taskid}})
}
module.exports={getLogDetails:getLogDetails}