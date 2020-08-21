let {Comment}=require('../models');
let postComments=async(model)=>{
    return await Comment.create(model);
}
module.exports={postComments:postComments};