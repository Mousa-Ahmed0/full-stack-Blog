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

 });