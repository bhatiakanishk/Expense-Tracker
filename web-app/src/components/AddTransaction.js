import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

//Functional Component for Add-Transaction Block 

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const { addTransaction } = useContext(GlobalContext);
    const user = JSON.parse(localStorage.getItem('profile'));
    
    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            text,
            amount: +amount,
            email: user?.result?.email
        }
        addTransaction(newTransaction);
        window.location.reload();
    }

    return (
        <div className="trans">
        <h3>Want to add new Transactions?</h3>
        <form onSubmit={onSubmit}>
        <div className="form-control">
            <label htmlFor="text">Title</label>
            <input type="text" className="text-field" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter title" />
            <br />
        </div>
        <div className="form-control">
            <label htmlFor="amount">Amount <br />
            (negative - expense,  positive - income)</label>
            <input type="number" className="amt-field" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
      </div>
    
    )
}