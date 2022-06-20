//here taking the reference of express:
import express from 'express';
//here we are taking the refernce of router method:
const router = express.Router();

//to pull the reference of the contollers/getTransaction method:
import * as trans from '../controllers/controllertransactions.js';
import auth from '../middleware/auth.js';

//here we are making a call to the route that is /transactions and then we will calling
//the get Transactions method
router
    .route('/')
    .get(auth, trans.getTransactions)
    .post(trans.addTransaction);

//these will help to route for a particular transaction:
router
    .route('/:id')
    .delete(trans.deleteTransaction)
    .put(trans.updateTransaction);

//making the router's reference public:
export default router;