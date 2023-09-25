const asyncHandler = require("express-async-handler");
const {Category, validateCreateCategory}=require("../models/category");
/**--------------------------------
 * @desc Create new comment
 * @router /api/comments
 * @method POST
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.createCategory=asyncHandler(async (req,res)=>{
    const {error}=validateCreateCategory(req.body);
    if(error)
        return res.status(400).json({message:error.details[0].message});

    const newCateg=await Category.create({
        title:req.body.title,
        user:req.user.id,
    });

    res.status(201).json(newCateg);
});


/**--------------------------------
 * @desc get all category
 * @router /api/comments
 * @method GET
 * @access public 
 * ------------------------------------------ */
module.exports.getAllCategory=asyncHandler(async (req,res)=>{
    const categoris=await Category.find();
    res.status(200).json(categoris);
}); 


/**--------------------------------
 * @desc Delete category
 * @router /api/comments/:id
 * @method DELETE
 * @access private (only admin) 
 * ------------------------------------------ */
module.exports.deleteCategory=asyncHandler(async (req,res)=>{
    const deleCategory=await Category.findById(req.params.id);
    if(!deleCategory)
        return   res.status(404).json({message:"category not found"});

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:"Category has been delete successfully",
        CategoryId:deleCategory._id,
    });
});