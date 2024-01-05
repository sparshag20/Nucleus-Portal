const {protect}=require('../middlewares/authMiddleware')
const express=require('express')

const router=express.Router()
const { registerUser, authUser, getMail, updateUserProfile }=require('../Controllers/userControllers')

// if user goes to api/users/ - it is register page
router.route('/').post(registerUser);


// if user goes to api/users/login it is login page
router.route('/login').post(authUser);

router.route('/getmail').put(getMail);
router.route('/profile').put(protect,updateUserProfile);

module.exports=router;