const { getAllUsers } = require('../Controller/user.Controller');
const { ifAdmin } = require('../middlewares/verifyToken');

const router=require('express').Router();
// /api/users/profile
router.get("/profile",ifAdmin,getAllUsers);

module.exports=router; 