const Joi=require('joi');


const timeSchema=Joi.object({
    startedAt:Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    endedAt:Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required()
})

module.exports={timeSchema:timeSchema}
