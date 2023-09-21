const { createPost } = require('../Controller/post.Controller');
const photoUpload = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');

const router=require('express').Router();
// /api/posts
router.route("/")
    .post(verifyToken,photoUpload.single("image"),createPost);
 module.exports=router; 