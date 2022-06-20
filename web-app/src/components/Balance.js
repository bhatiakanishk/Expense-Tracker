import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
 
//Functional Component for Balance
export const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions?.map(transaction => transaction.amount);

    const total = amounts?.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <>
            <h4>Your Current Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </>
    )
}