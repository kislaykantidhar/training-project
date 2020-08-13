
let {adminSignUpValidate} = require('../schemas/adminSignUpSchema')
let adminSignUp=(schema)=>{
    let valid=adminSignUpValidate(schema);
    if(!valid){
        return false
    }
    else{
        return true;
    }
}

module.exports={adminSignUp:adminSignUp};
