import React, { useState } from 'react';

//Importing single exports from the components
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from './constants/actionTypes.js';
import { Description } from './components/Description';


//Importing SASS files
import './App.scss';
import './container.scss';
import './Form.scss';
import './index.scss';
import './Main.scss';
import './Money.scss';

//Adding Header, Balance, IncomeExpenses, TransactionList and AddTransaction, Description components
function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  function handleClick() {
    dispatch({ type: actionType.LOGOUT });

    navigate("/", { replace: true });

    setUser(null);
  }
  return (
    <><GlobalProvider>
      <button className="btnLogout" type="button" onClick={handleClick}>
        Logout
      </button>
      <img src="/images/expenseTrackerLogo.png" className="logo-main" alt="logo" />
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
        <Description />
      </div>
      <img src="/images/transaction-vector-icon.jpeg" className="trans-pic" width="155" height="120" alt="transaction" />
      <img src="/images/transpic.png" className="pic" width="200" height="120" alt="transaction" />
    </GlobalProvider></>
  );
}

export default Home;