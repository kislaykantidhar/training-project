let {Task}=require('../models');
let showAssignedTasks=async(uid)=>{
    return await Task.findAll({attributes:['id','title','summary','created_at'],where:{
        assigned_to:uid
    }})
}

module.exports={showAssignedTasks:showAssignedTasks};