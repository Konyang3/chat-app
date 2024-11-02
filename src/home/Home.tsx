import React from 'react';
import logo from '../logo.svg';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <header>
        <button>로그인</button>
        <button>회원가입</button>
      </header>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}

export default Home;
