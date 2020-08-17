const Joi=require('joi');
const adminSignUpSchema=Joi.object({
    name:Joi.string().min(3).max(40).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().min(8).max(12).required()
})


module.exports={adminSignUpSchema:adminSignUpSchema};