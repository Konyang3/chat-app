import React from 'react';
import './App.css';
import Home from './page/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './page/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
