const { getAllUsers, getUser, updateUserProfile, getUsersCount, profilePhotoUpload} = require('../Controller/user.Controller');
const { ifAdmin, verifyTokenOnlyUser, verifyToken} = require('../middlewares/verifyToken');
const validateId=require("../middlewares/validateObjectId");
const photoUpload = require('../middlewares/photoUpload');
const router=require('express').Router();
// /api/users/profile
router.get("/profile",ifAdmin,getAllUsers);

// /api/users/count
router.get("/count",ifAdmin,getUsersCount);

// /api/users/profile:id
router.route("/profile/:id").get(validateId,getUser)
      .put(validateId,verifyTokenOnlyUser,updateUserProfile);

//api/users/profile /profile-photo-upload
router.route("/profile/profile-photo-upload")
      .post(verifyToken,photoUpload.single("image"),profilePhotoUpload);

module.exports=router; 