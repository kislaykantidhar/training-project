const Joi=require('joi');
const taskSchema=Joi.object({
    title:Joi.string().min(20).max(350).required(),
    summary: Joi.string().min(50).required(),
    assignedTo:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

module.exports={taskSchema:taskSchema};