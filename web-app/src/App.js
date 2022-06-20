import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import './App.scss';
import Login from './components/Login/Login';
import Home from './Home';
import Auth from './components/Auth/Auth'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/home' element={<Home />}></Route>
        <Route exact path='/auth' element={<Auth />}></Route>
      </Routes>
    </Router>

  );
}

export default App;