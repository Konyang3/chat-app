import React from 'react';
import logo from '../../asset/Logo.png';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button/Button';
import { useAppDispatch, useAppSelector } from '../../reducer/hook';
import { selectId, setId } from '../../reducer/appSlice';

function Home() {
  const navigate = useNavigate()
  const id = useAppSelector(selectId)
  const dispatch = useAppDispatch()

  const goToLogin = () => {
    navigate('/login')
  }

  const goToJoin = () => {
    navigate('/join')
  }

  const logout = () => {
    fetch('http://localhost:8080/logout', {
      method: 'get',
      credentials: "include"
    }).then((res) => {
      if (res.status) {
        dispatch(setId(null))
        navigate('/')
      }
    }).catch(() => {
      alert('로그아웃에 실패하였습니다.')
    })
  }
  
  return (
    <div className="Home">
      <header>
        {id === null? 
          <div className={'button-group'}>
            <Button onClick={goToLogin}>로그인</Button>
            <Button onClick={goToJoin}>회원가입</Button>
          </div> :
          <div className={'button-group'}>
              <Button onClick={logout}>로그아웃</Button>
          </div>
          }
      </header>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}

export default Home;
