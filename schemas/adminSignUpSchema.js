const Ajv=require('ajv');
const ajv=new Ajv();
const adminSignUpSchema={
    "type":"object",
    "required":["name","email","password"],
    "maxproperties":3,
    "properties":{
        "name":{
            "type":"string",
            "minLength": 3,
            "maxLength": 40
        },
        "email":{
            "type":"string",
            "format":"email"
        },
        "password":{
            "type":"string",
            "minLength":8,
            "maxLength":12
        }
    }
}
let adminSignUpValidate=ajv.compile(adminSignUpSchema);

module.exports={adminSignUpValidate:adminSignUpValidate};