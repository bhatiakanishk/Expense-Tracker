import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    req.headers.email = JSON.parse(localStorage.getItem('profile')).result.email;
  }
  console.log(req);
  return req;
});

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  //GET TRANSACTION
  async function getTransactions() {
    try {
      const res = await API.get('/transactions');
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error
      });
    }
  }

  //DELETE TRANSACTION
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response?.data?.error,
      });
    }
  }

  //ADD TRANSACTION
  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post('/transactions', transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response?.data?.error,
      });
    }
  }


  //UPDATE TRANSACTION
  async function updateTransaction(id, newText, newAmount) {
    const obj = {
      text: newText,
      amount: newAmount
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/transactions/${id}`,
        JSON.stringify(obj),
        config
      );
      console.log("res", res);
      dispatch({
        type: "UPDATE_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data.error
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
        updateTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
