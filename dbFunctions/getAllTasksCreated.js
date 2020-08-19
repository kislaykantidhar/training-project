let {Tasks}=require('./tabledefination');
let getAllTasksCreated=async(id)=>{
    return Tasks.findAll({where:{created_by:id}});
}
module.exports={getAllTasksCreated:getAllTasksCreated}