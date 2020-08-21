let {Task}=require('../models');
let taskRow=async(id)=>{
    return  await Task.findByPk(id)
}
module.exports={taskRow:taskRow}