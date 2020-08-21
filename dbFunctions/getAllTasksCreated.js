let {Task}=require('../models');
let getAllTasksCreated=async(id)=>{
    return await Task.findAll({where:{created_by:id}});
}
module.exports={getAllTasksCreated:getAllTasksCreated}