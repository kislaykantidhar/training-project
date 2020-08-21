let {Comment}=require('../models')
let getComments=async(taskid)=>{
    return await Comment.findAll({where:{taskid:taskid}});

}
module.exports={getComments:getComments};