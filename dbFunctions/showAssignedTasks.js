let {Tasks}=require('./tabledefination');
let showAssignedTasks=async(uid)=>{
    return Tasks.findAll({attributes:['id','title','summary','created_at'],where:{
        assigned_to:uid
    }})
}

module.exports={showAssignedTasks:showAssignedTasks};