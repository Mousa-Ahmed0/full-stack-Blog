const { getAllUsers, getUser, updateUserProfile, getUsersCount} = require('../Controller/user.Controller');
const { ifAdmin, verifyTokenOnlyUser } = require('../middlewares/verifyToken');
const validateId=require("../middlewares/validateObjectId")
const router=require('express').Router();
// /api/users/profile
router.get("/profile",ifAdmin,getAllUsers);

// /api/users/count
router.get("/count",ifAdmin,getUsersCount);

// /api/users/profile:id
router.get("/profile/:id",validateId,getUser)
      .put("/profile/:id",validateId,verifyTokenOnlyUser,updateUserProfile);



module.exports=router; 