const asyncHandler = require("express-async-handler");
const {user, validateUpdateUser} = require('../models/user');
const { post,validateCreatePost,validateUpdatePost } = require("../models/post")
const {Comment}=require("../models/Comment");
const bcrypt = require("bcrypt");
const path =require("path");
const fs=require("fs");
const { cloudinaryUploadImage,cloudinaryRemoveImage, cloudinaryRemoveMultipleImage}=require("../utils/cloudinary");
/**--------------------------------
 * @desc Get all Users profile
 * @router /api/users/Ptofile
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getAllUsers=asyncHandler(async (req,res)=>{ 
    const users=await user.find().select("-password").populate("Posts");
    res.status(200).json(users);
})


/**--------------------------------
 * @desc Get  User profile
 * @router /api/users/Ptofile/id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getUser=asyncHandler(async (req,res)=>{

    const userOne=await user.findById(req.params.id).select("-password").populate("Posts");
    if(!userOne)
        return     res.status(404).json({message:"User not found"});
    res.status(200).json(userOne);
})

 
/**--------------------------------
 * @desc Update  User profile
 * @router /api/users/Ptofile/id
 * @method put 
 * @access private (only user himself)
 * ------------------------------------------ */

module.exports.updateUserProfile=asyncHandler(async (req,res)=>{
    const {error} =validateUpdateUser(req.body);
    if(error)
        return res.status(400).json({message:error.details[0].message});

    if(req.body.password){
        const salt = await bcrypt.genSalt(8);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser=await user.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            password:req.body.password,
            bio:req.body.bio
        }
    },{new:true}).select("-password");
    res.status(200).json(updatedUser);
})

/**--------------------------------
 * @desc Get  Users Count
 * @router /api/users/count
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCount=asyncHandler(async (req,res)=>{ 
    const count=await user.count();
    res.status(200).json(count);
})


/**--------------------------------
 * @desc   Profile photo upload
 * @router /api/users/profile /profile-photo-upload
 * @method post
 * @access private (only logged in user)
 * ------------------------------------------ */
module.exports.profilePhotoUpload=asyncHandler(async (req,res)=>{ 
    //1- validation
    if(!req.file)
        return res.status(400).json({message:"No file provided"});

    //2- get the  path to the image
    const imagePath=path.join(__dirname,`../images/${req.file.filename}`);  

    //3- upload to cloudinary
    const result =await cloudinaryUploadImage(imagePath);
    // console.log("upload to cloudinary");

    // console.log(result);

    //4- get the user from DB
    const userN=await user.findById(req.user.id);
    // console.log("get the user from DB");

    // console.log(userN);

    //5- delete the old profile photo if exist
    if(userN.profilePhoto.publicId !== null)
        await cloudinaryRemoveImage(userN.profilePhoto.publicId);

    //6- chancg the profilephoto filed in the DB
    userN.profilePhoto={
        url:result.secure_url, 
        publicId:result.public_id,
    } 
    await userN.save();
    // console.log("save db");

    // console.log(userN);
    //7- send response to client
    res.status(200).json({
        message:"Your profile photo uploaded successfully", 
        profilePhoto:{url:userN.secure_url,publicId:userN.public_id}
    });

    //8- remove image from the server
    fs.unlinkSync(imagePath);
});






/**--------------------------------
 * @desc   Delete user profile (Account)
 * @router /api/users/profile/:id
 * @method DELETE
 * @access private (only admin or user himself)
 * ------------------------------------------ */ 
module.exports.deleteUserAccount=asyncHandler(async (req,res)=>{
    //1-get user from db
    const deleUser=await user.findById(req.params.id);
    if(!deleUser)
        return res.status(404).json({message:"User not found"});

    //2 get all posts from DB
    const posts=await post.find({user:deleUser._id});

    //3. get the public ids from posts
    const publicID=posts?.map((postId)=>postId.image.publicId);

    //4. delete all posts image from cloudinary that belong to this user
    if(publicID?.length>0)
        await cloudinaryRemoveMultipleImage(publicID);
    //5 Delete the profile picture from cloudinary
    await cloudinaryRemoveImage(deleUser.profilePhoto.publicId);
    //6. Delete user post and comments
    await post.deleteMany({user:deleUser._id});
    await Comment.deleteMany({user:deleUser._id});
    //7- delete the user himself
    await user.findByIdAndDelete(req.params.id);
    //8- send a response to the client
    res.status(200).json({message:"Your profile has been deleted"});

});