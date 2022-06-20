//taking the reference of mongoose:
import mongoose from 'mongoose';

//here I am creating the schema 
const TransactionsSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please enter add a positive or negative number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        trim: true
    }
});

const expensedbRef = mongoose.model('Transactions', TransactionsSchema);

export default expensedbRef;