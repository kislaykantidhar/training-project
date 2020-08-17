const {Tasks}=require('./tabledefination');
let addTask= async(model)=>{
    return Tasks.create({created_by:model.created_by,title:model.title_of_task,summary:model.summary_of_the_task,assigned_to:model.assigned_to,created_at:model.created_at,status:model.status})
}

module.exports={addTask:addTask};