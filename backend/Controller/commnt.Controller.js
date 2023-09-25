const asyncHandler = require("express-async-handler");
const path =require("path");
const fs=require("fs");
const { cloudinaryUploadImage,cloudinaryRemoveImage}=require("../utils/cloudinary");
const { Comment,validateCreateCommnt,validateUpdateCommnt } = require("../models/Comment");
const {user}=require("../models/user");
const { text } = require("express");
/**--------------------------------
 * @desc Create new comment
 * @router /api/comments
 * @method POST
 * @access private (only logged in user)
 * ------------------------------------------ */
module.exports.createComment=asyncHandler(async (req,res)=>{
    const {error}=validateCreateCommnt(req.body);
    if(error)
        return res.status(400).json({message:error.details[0].message});

    const profile =await user.findById(req.user.id);
    const newComment=await Comment.create({
        postId:req.body.postId,
        text:req.body.text,
        user:req.user.id,
        username:profile.username,
    });

    res.status(201).json(newComment);
});

/**--------------------------------
 * @desc   Get all comments
 * @router /api/comments
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getAllComment=asyncHandler(async (req,res)=>{
    const comments=await Comment.find().populate("user",["-password"])

    res.status(200).json(comments);
});

/**--------------------------------
 * @desc   Delete comments
 * @router /api/comments/:id
 * @method DELETE
 * @access private (only admin or owner of the comment)
 * ------------------------------------------ */
module.exports.deleteComment=asyncHandler(async (req,res)=>{
    const delecomment=await Comment.findById(req.params.id);
    if(!delecomment)
        return res.status(404).json({message:"Comment not found"});
    
    if(req.user.isAdmin|| req.user.id === delecomment.user.toString()){
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"comment has been deleted"});
    }
    else{
        res.status(403).json({message:"access denied,not allowed"});
    }
});

/**--------------------------------
 * @desc   Update comments
 * @router /api/comments/:id
 * @method PUT
 * @access private (owner of the comment)
 * ------------------------------------------ */
module.exports.updateComment=asyncHandler(async (req,res)=>{
    const {error}=validateUpdateCommnt(req.body);
    if(error)
        return res.status(400).json({message:error.details[0].message});
    
    const  updComment=await Comment.findById(req.params.id);
    if(!updComment)
        return res.status(404).json({message:"Comment not found"});
    
  
    if(req.user.id !== updComment.user.toString()){
        console.log(req.user);
        return res.status(403).json({message:"Access denied,only user himself can edit his comment"});
    }
    
    const newComment=await Comment.findByIdAndUpdate(req.params.id,{
        $set:{
            text:req.body.text,
        }
    },{new:true});
    res.status(200).json(newComment);
});