//taking the reference of service's transactions:
import * as transactionService from '../services/servicetransactions.js';

//@desc get all the transactions
//@route GET /transactions
//@access Public
export const getTransactions = async (req, res, next) => {
    try {
        if(!req.email) return res.json({ message: 'Unauthenticated'});

        const transactions = await transactionService.search(req.email);

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}


//@desc Add a transaction
//@route POST /transactions
//@access Public
export const addTransaction = async (req, res, next) => {
    try {
        // const { text, amount } = req.body;
        const tarnsactiontoadd = { ...req.body }
        const transaction = await transactionService.create(tarnsactiontoadd);
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}


//@desc Update a transaction
//@route Update /transactions/:id
//@access Public
export const updateTransaction = async (req, res) => {
    try {
        // const transaction = await Transaction.findById(req.params.id);
        // if (!transaction) {
        //     return req.status(404).json({
        //         success: false,
        //         error: 'No such transaction'
        //     });
        // }
        const id = req.params.id;
        let newtext = req.body.text;
        let newamount = req.body.amount;
        const value = await transactionService.update(id, newtext, newamount);
        return res.status(200).json({
            success: true,
            data: value
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

//@desc Delete a transaction
//@route DELETE /transactions/:id
//@access Public
export const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.remove(req.params.id);

        if (!transaction) {
            return req.status(404).json({
                success: false,
                error: 'No such transaction'
            });
        }

        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}