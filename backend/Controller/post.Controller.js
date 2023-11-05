const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const path =require("path");
const fs=require("fs");
const { cloudinaryUploadImage,cloudinaryRemoveImage}=require("../utils/cloudinary");
const { post,validateCreatePost,validateUpdatePost } = require("../models/post")
const {Comment}=require("../models/Comment");
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
 * @desc get all post
 * @router /api/posts
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getAllPost=asyncHandler(async(req,res)=>{
    const POST_PER_PAGE=3;
    const {pageNumber,category}=req.query;
    let posts;
    
    if(pageNumber){
        posts=await post.find()
            .skip((pageNumber -1)* POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({createdAt: -1})
            .populate("user",['-password']).populate("Comments");
    }
    else if(category)
        posts=await post.find({category}).sort({createdAt: -1}).populate("user",['-password']).populate("Comments");
    else
        posts=await post.find().sort({createdAt: -1}).populate("user",['-password']).populate("Comments");

    res.status(200).json(posts);
});



/**--------------------------------
 * @desc get single post
 * @router /api/posts/:id
 * @method GET
 * @access private
 * ------------------------------------------ */
module.exports.getPost=asyncHandler(async(req,res)=>{
    const newPost =await post.findById(req.params.id).populate("user",['-password']).populate("Comments");
    if(!post)
        return res.status(404).json({message:'Post not found'});

    res.status(200).json(newPost);
}); 



/**--------------------------------
 * @desc get count post
 * @  /api/posts/count
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
        //Delete all comments
        await Comment.deleteMany({postId:delPost._id});
        res.status(200).json({message:"Post has been deleted successfully",postId:delPost._id});
    }
    else
        return res.status(403).json({message:'access denied, forbidden'});

}); 


/**--------------------------------
 * @desc Update post
 * @router /api/posts/:id
 * @method PUT
 * @access private (only owner of the post)  
 * ------------------------------------------ */
module.exports.updatePost=asyncHandler(async(req,res)=>{
    //1. Validation
    const {error}=validateUpdatePost(req.body);
    if(error)
        return res.status(400).json({message:error.details[0].message});

    //2. Get the post from DB and chack if post exist
    const updPost=await post.findById(req.params.id);
    if(!updPost)
        return res.status(404).json({message:"Post not found..."});

    //3.check if this post belong to logged in user
    if(req.user.id!== updPost.user.toString())
        return res.status(403).json({message:"access denied, you are not allowed"});

    //4.update post
    const newUpdate = await post.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            description:req.body.description,
            category:req.body.category
        }
    },{new:true}).populate("user",['-password']);

    //5. send response to the client
    res.status(200).json(newUpdate);
})



/**--------------------------------
 * @desc Update post Image
 * @router /api/posts/upload-image/:id
 * @method PUT
 * @access private (only owner of the post)  
 * ------------------------------------------ */
module.exports.updatePostImage=asyncHandler(async(req,res)=>{
    //1. Validation
    if(!req.file)
        return res.status(400).json({message:"No image provided"});

    //2. Get the post from DB and chack if post exist
    const updPost=await post.findById(req.params.id);
    if(!updPost)
        return res.status(404).json({message:"Post not found..."});

    //3.check if this post belong to logged in user
    if(req.user.id!== updPost.user.toString())
        return res.status(403).json({message:"access denied, you are not allowed"});

    //4.delete the old image
    await cloudinaryRemoveImage(updPost.image.publicId);
    
    //5. upload new photo
    const imagepath=path.join(__dirname,`../images/${req.file.filename}`);
    const result=await cloudinaryUploadImage(imagepath);
    
    //6. update the image field in the DB
    const newUpdate = await post.findByIdAndUpdate(req.params.id,{
        $set:{
            image:{
                url:result.secure_url,
                publicId:result.public_id,
            }
        }
    },{new:true}).populate("user",['-password']);
    //7. send response to the client
    res.status(200).json(newUpdate);
    //8. Remove image from the server
    fs.unlinkSync(imagepath);
})



/**--------------------------------
 * @desc Toggle like
 * @router /api/posts/like/:id
 * @method PUT
 * @access private (only loggeg in user)  
 * ------------------------------------------ */
module.exports.toggleLike=asyncHandler(async(req,res)=>{
    const loggedInUser=req.user.id;
    const {id:postId}=req.params;

    //1. Get the post from DB and chack if post exist
    let likePost=await post.findById(postId);
    if(!likePost)
        return res.status(404).json({message:"Post not found..."});

    //2.check if this post belong to logged in user
    const isPostAlreadyLike=likePost.likes.find((user)=>user.toString()===loggedInUser);
    
    if(isPostAlreadyLike){
        likePost=await post.findByIdAndUpdate(postId,
        {
            $pull:{likes:loggedInUser}
        },{new:true});
    }
    else{
        likePost=await post.findByIdAndUpdate(postId,
        {
            $push:{likes:loggedInUser}
        },{new:true});
    }
   // send response to the client
   res.status(200).json(likePost);
});