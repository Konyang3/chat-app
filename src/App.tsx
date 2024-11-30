import React from 'react';
import './App.css';
import Home from './page/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './page/login/Login';
import Join from './page/join/Join';
import Main from './page/main/Main';
import Chat from './page/chat/Chat';
import CreateChat from './page/create-chat/CreateChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/main' element={<Main />} />
        <Route path='/chat/:subjectName' element={<Chat />} />
        <Route path='/create-chat' element={<CreateChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
