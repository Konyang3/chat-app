import React from 'react';
import './App.css';
import Home from './page/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './page/login/Login';
import Join from './page/join/Join';
import StudentMain from './page/student-main/StudentMain';
import Chat from './page/chat/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/student-main' element={<StudentMain />} />
        <Route path='/chat/:subjectName' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
