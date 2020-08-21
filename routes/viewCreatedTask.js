const express=require('express');
const router=express.Router();
const moment=require('moment');
const {verifyToken}=require('../services/verifyToken');
const {getAllTasksCreated}=require('../dbFunctions/getAllTasksCreated')

let extractToken=require('../middleware/extractToken')

router.get('/view/CreatedTask',extractToken,(req,res)=>{
    let decoded=verifyToken(req.token);
    if(decoded==null)
    {
        res.sendStatus(403);
    }
    else
    {   
       getAllTasksCreated(decoded.id)
       .then(val=>{
           if(val[0]==null)
           {
               res.json({msg:" haven't created any tasks yet"})
           }
           else
           {
            let val2=[];
            let buff;
            for (let obj of val)
            {
                buff=obj.dataValues;
                buff.showComments="http://localhost:5227/view/Comments?task_id="+obj.dataValues.id;
                buff.logs="http://localhost:5227/logs?task_id="+obj.dataValues.id;
                val2.push(buff);

            }
            res.json({msg:val2}); 

           }

       })
    }
})


module.exports=router;