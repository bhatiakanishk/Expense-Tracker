import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

//Functional Component for Description button and its explanation pup-up
export const Description = () => {

    const [open, setOpen] = React.useState(false);

    const descriptionClickOpen  = () => {
        setOpen(true);
      };
      
      const descriptionClose = () => {
        setOpen(false);
      };
    return (   

    <div className="desc">
      <Button onClick={descriptionClickOpen}>
        Hey, learn how the App works? :)
      </Button>
      <Dialog open={open} onClose={descriptionClose}>
        <DialogTitle>
           Greetings from Expense Tracker!!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Connect to our 'Pocket-Easy' Expense Tracker to add your daily income and expenditure in simple amount value as 'plus' for 'Income' and 'minus' for 'Expenditure'. We’ll import and categorize your expenses for you and run reports to see show you spend every dollar. Also we'll keep your Pocket in track always by letting you know how much money are you left with overall, or in debt ( in case of minus overall total)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={descriptionClose} color="primary">
           Close
          </Button>
          <Button onClick={descriptionClose} color="primary" autoFocus>
           Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
          
    )
}
