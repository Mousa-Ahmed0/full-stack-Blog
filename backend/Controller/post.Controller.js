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


/**--------------------------------
 * @desc get post
 * @router /api/posts
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAllPost=asyncHandler(async(req,res)=>{
    const POST_PER_PAGE=3;
    const {pageNumber,category}=req.query;
    let posts;
    
    if(pageNumber){
        posts=await post.find()
            .skip((pageNumber -1)* POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({createdAt: -1});
    }
    else if(category)
        posts=await post.find({category}).sort({createdAt: -1});
    else
        posts=await post.find().sort({createdAt: -1}).populate("user",['-password']);

    res.status(200).json(posts);
});



/**--------------------------------
 * @desc get single post
 * @router /api/posts/:id
 * @method GET
 * @access private
 * ------------------------------------------ */
module.exports.getPost=asyncHandler(async(req,res)=>{
    const newPost =await post.findById(req.params.id).populate("user",['-password']);
    if(!post)
        return res.status(404).json({message:'Post not found'});

    res.status(200).json(newPost);
}); 



/**--------------------------------
 * @desc get count post
 * @router /api/posts/count
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getPostCount=asyncHandler(async(req,res)=>{
    const count =await post.count();

    res.status(200).json(count);
}); 


/**--------------------------------
 * @desc delete post
 * @router /api/posts/:id
 * @method DELETE
 * @access private (only admin or owner of the post)
 * ------------------------------------------ */
module.exports.deletePost=asyncHandler(async(req,res)=>{
    const delPost =await post.findById(req.params.id);
    if(!post)
        return res.status(404).json({message:'Post not found'});
    if(req.user.isAdmin || req.user.id ===delPost.user.toString()){
        await post.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(delPost.image.publicId);
        res.status(200).json({message:"Post has been deleted successfully",postId:delPost._id});
    }
    else
        return res.status(403).json({message:'access denied, forbidden'});

}); 
