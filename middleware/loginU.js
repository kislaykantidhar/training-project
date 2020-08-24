
let {logInUser}=require('../dbFunctions/logInUser');
let {validPassword}=require('../services/validPassword');
let  {createToken}=require('../services/createToken');
let loginU=(req,res)=>{
    if(req.body.email===undefined||req.body.password===undefined)
    {
        res.sendStatus(403);
    }
    else{
        let {email,password}=req.body;
        logInUser(email)
        .then(val=>{
            if (val==null)
            {
                res.json({msg:"Your email Id or password is invalid"});
            }
            else
            {
                validPassword(password,val.password)
                .then(isValid=>{
                    if(isValid)
                    {   
                        let data={
                            name:val.name,
                            email:val.emailid,
                            id:val.id
                        }
                        let token=createToken(data)
                        res.json({msg:"welcome",token:token});
                    }
                    else{
                        res.json({msg:"Your email Id or password is invalid"})
                    }
                })
            }
        })
    }
}
module.exports=loginU;