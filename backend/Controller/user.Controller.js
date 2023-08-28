const asyncHandler = require("express-async-handler");
const {user, validateUpdateUser} = require('../models/user');
const bcrypt = require("bcrypt");

/**--------------------------------
 * @desc Get all Users profile
 * @router /api/users/Ptofile
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getAllUsers=asyncHandler(async (req,res)=>{ 
    const users=await user.find().select("-password");
    res.status(200).json(users);
})


/**--------------------------------
 * @desc Get  User profile
 * @router /api/users/Ptofile/id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getUser=asyncHandler(async (req,res)=>{

    const userOne=await user.findById(req.params.id).select("-password");
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
            password:req.params.password,
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
    if(!req.file)
        res.status(400).json({message:"No file provided"});

    res.status(200).json({message:"Your profile photo uploaded successfully"});
})
