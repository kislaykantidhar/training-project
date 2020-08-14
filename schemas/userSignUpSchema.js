

const userSignUpSchema={
    "type":"object",
    "required":["name","email","password"],
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
module.exports={userSignUpSchema:userSignUpSchema};