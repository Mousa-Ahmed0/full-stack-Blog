const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const path =require("path");
const fs=require("fs");
const { cloudinaryUploadImage,cloudinaryRemoveImage}=require("../utils/cloudinary");
const { post,validateCreatePost,validateUpdatePost } = require("../models/post")



/**--------------------------------
 * @desc Create new Post
 * @router /api/posts
 * @method POST
 * @access private (only logged in user)
 * ------------------------------------------ */
module.exports.createPost=asyncHandler(async(req,res)=>{
    //1. validation for image
    if(!req.file)
        return res.status(400).json({message:"NO image provided"});
    // 2. validation for data
    const {error}=validateCreatePost(req.body);
    if(error)
        return res.status(400).json({message:error.details[0].message});
    //3. upload photo
    const imagepath= path.join(__dirname,`../images/${req.file.filename}`);
    const result=await cloudinaryUploadImage(imagepath);
    //4. create new post and save it to DB
    const newPost=await post.create({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        user:req.user.id,
        image:{
            url:result.secure_url,
            publicId:result.public_id,
        }
    });
    //5. send response to the clinet
    res.status(201).json(newPost);
    //6. Remove image from the server
    fs.unlinkSync(imagepath);
    
});