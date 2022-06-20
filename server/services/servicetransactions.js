//here I am taking the reference of model
import Transaction from '../models/modeltransactions.js';

//this will help to pull all the transactions of a particular user:
export const search = (params) => {
    var query = { email: params };
    const promise = Transaction.find(query).exec();
    return promise;
};

//this will help to create a new transaction for a particular user:
export const create = (newtransaction) => {
    const transaction = new Transaction(newtransaction);
    const promise = transaction.save();
    return promise;
};

//this will help to remove a transaction for a particular user:
export const remove = (id) => {
    const promise = Transaction.findByIdAndRemove({
        _id: id
    }).exec();
    return promise;
};

//this will help to update a transaction for a particular user:
export const update = async (id, newtext, newamount) => {
    const promise = Transaction.findOneAndUpdate({ _id: id }, { text: newtext, amount: newamount }, { new: true }).exec();
    return promise;
};
