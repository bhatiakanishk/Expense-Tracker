import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

//deleteTransactions called from this function
//updateTransactions called from this function
export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const { updateTransaction } = useContext(GlobalContext);

  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  
  const handleClickOpen = (transaction) => {
    setText(transaction.text);
    setAmount(numberWithCommas(Math.abs(transaction.amount)))
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    updateTransaction(transaction._id, text, amount);
    window.location.reload();
    setOpen(false);
  };

  const sign = transaction?.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
      <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
      <button onClick={() => handleClickOpen(transaction)} className="update-btn">Correct It</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
           Oops, I made a mistake, I need to change!
        </DialogTitle>
        <DialogContent>
        <div className="form-control">
            <label htmlFor="text">Title</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter title" />
            <br />
        </div>
        <div className="form-control">
            <label htmlFor="amount">Amount <br />
            (negative - expense,  positive - income)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           Close
          </Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
           Yes
          </Button>
        </DialogActions>
      </Dialog>
    </li>
  )
}