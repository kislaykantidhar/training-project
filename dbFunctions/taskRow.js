let {Tasks}=require('./tabledefination');
let taskRow=async(id)=>{
    return Tasks.findByPk(id)
}
module.exports={taskRow:taskRow}