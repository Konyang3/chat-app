import React from 'react';
import './App.css';
import Home from './page/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './page/login/Login';
import Join from './page/join/Join';
import Main from './page/main/Main';
import Chat from './page/chat/Chat';
import CreateChat from './page/create-chat/CreateChat';
import JoinChat from './page/join-chat/JoinChat';
import CalendarView from './page/calendar-veiw/CalendarView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/main' element={<Main />} />
        <Route path='/chat/:subjectCode/:subjectName' element={<Chat />} />
        <Route path='/chat/:subjectCode/:subjectName/calendar' element={<CalendarView />}/>
        <Route path='/create-chat' element={<CreateChat />} />
        <Route path='/join-chat' element={<JoinChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
