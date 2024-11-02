import React from 'react';
import logo from '../../logo.svg';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button/Button';

function Home() {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

  const goToJoin = () => {
    navigate('/join')
  }
  
  return (
    <div className="Home">
      <header>
        <div className={'button-group'}>
          <Button onClick={goToLogin}>로그인</Button>
          <Button onClick={goToJoin}>회원가입</Button>
        </div>
      </header>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}

export default Home;
