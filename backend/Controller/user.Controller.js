const asyncHandler = require("express-async-handler");
const {user} = require('../models/user');

/**--------------------------------
 * @desc Get all Users profile
 * @router /api/users/Ptofile
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getAllUsers=asyncHandler(async (req,res)=>{
    if(!req.user.isAdmin){
        return     res.status(403).json({meassage:"Not allwed,only admin"});
    }
    const users=await user.find();
    res.status(200).json(users);
})