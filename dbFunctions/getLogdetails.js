let {LogTime}=require('../models')
let getLogDetails= async(taskid)=>{
    return await LogTime.findAll({where:{taskid:taskid}})
}
module.exports={getLogDetails:getLogDetails}