//here taking the reference of express:
import express from 'express';
//here we are taking the refernce of router method:
const router = express.Router();

//to pull the reference of the contollers/user methods:
import { signin, signup, verifyemail } from "../controllers/user.js";

//route for sign in
router
    .route('/signin')
    .post(signin);

//route for signup:
router
    .route('/signup')
    .post(signup);


//route to verify email:
router
    .route('/verifyemail')
    .get(verifyemail);

//making the router's reference public:
export default router;

