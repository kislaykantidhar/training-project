let {Comments}=require('./tabledefination')
let getComments=async(taskid)=>{
    return Comments.findAll({where:{taskid:taskid}});

}
module.exports={getComments:getComments};