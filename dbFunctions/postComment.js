let {Comments}=require('./tabledefination');
let postComments=async(model)=>{
    return Comments.create(model);
}
module.exports={postComments:postComments};