const { createPost, getAllPost, getPost, getPostCount, deletePost, updatePost, updatePostImage } = require('../Controller/post.Controller');
const photoUpload = require('../middlewares/photoUpload');
const validateObjectId = require('../middlewares/validateObjectId');
const { verifyToken } = require('../middlewares/verifyToken');

const router=require('express').Router();
// /api/posts
router.route("/")
    .post(verifyToken,photoUpload.single("image"),createPost)
    .get(getAllPost);
// /api/posts/count
router.route("/count").get(getPostCount);
// /api/posts/:id
router.route("/:id")
    .get(validateObjectId,getPost)
    .delete(validateObjectId,verifyToken,deletePost)
    .put(validateObjectId,verifyToken,updatePost);

// /api/posts/update-image/:id
router.route("/update-image/:id")
    .put (validateObjectId,verifyToken,photoUpload.single("image"),updatePostImage);

module.exports=router; 