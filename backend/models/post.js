const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
//post schema
const postSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:Object,
        default:{
            url:"",
            publicID:null,
        }
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
},{
    timestamps:true,
})
const post=mongoose.model("Post",postSchema);

//validate create post 
function validateCreatePost(obj){
    const Schema=Joi.object({
        title:Joi.string().trim().min(2).max(100).required(),
        description:Joi.string().trim().min(10).required(),
        category:Joi.string().trim().required(),
    });
    return Schema.validate(obj);
}


//validate update post 
function validateUpdatePost(obj){
    const Schema=Joi.object({
        title:Joi.string().trim().min(2).max(100),
        description:Joi.string().trim().min(10),
        category:Joi.string().trim(),
    });
    return Schema.validate(obj);
}
  
module.exports ={
    post,
    validateCreatePost,
    validateUpdatePost
}