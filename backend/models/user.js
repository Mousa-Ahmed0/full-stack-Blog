const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
//user Schema
const UserSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        maxlength:100,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
    },
    profilePhoto:{
        type:Object,
       default:{
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicId:null,
       }
    },
    bio:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isAccountVerified:{
        type:Boolean,
        default:false,
    },
},{
    timestamps:true,
})
//generate auth token
UserSchema.methods.generateAuthToken=function(){
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.SECRET_KEY);
}
//user Model
const user=mongoose.model("User",UserSchema);
//validate Register user
function validateRegisterUser(obj){
    const Schema=Joi.object({
        username:Joi.string().trim().min(2).max(100).required(),
        email:Joi.string().trim().min(5).max(100).email().required(),
        password:Joi.string().trim().min(8).required(),
    });
    return Schema.validate(obj);
}

//validate Login user
function validateLoginUser(obj){
    const Schema=Joi.object({
        email:Joi.string().trim().min(5).max(100).email().required(),
        password:Joi.string().trim().min(8).required(),
    });
    return Schema.validate(obj);
}


//validate Register user
function validateUpdateUser(obj){
    const Schema=Joi.object({
        username:Joi.string().trim().min(2).max(100),
        password:Joi.string().trim().min(8),
        bio:Joi.string(),
    });
    return Schema.validate(obj);
}
module.exports={
    user,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
} 