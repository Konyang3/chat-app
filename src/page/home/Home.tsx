import React, { useEffect } from 'react';
import logo from '../../asset/Logo.png';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button/Button';
import { useAppDispatch, useAppSelector } from '../../reducer/hook';
import { selectId, setId, setSubjectList } from '../../reducer/appSlice';
import { buildUrl } from '../../util/util';

function Home() {
  const navigate = useNavigate()
  const id = useAppSelector(selectId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetch(buildUrl('/user'), {
        method: 'get',
        headers: {'content-type': "application/json"},
        credentials: "include"
    }).then((res) => {
        if (res.status === 200) {
            res.json().then((value) => {
                dispatch(setId(value.id))
                dispatch(setSubjectList(value.subjectCodes))
            })
        }
    })
  }, [])

  const goToLogin = () => {
    navigate('/login')
  }

  const goToJoin = () => {
    navigate('/join')
  }

  const logout = () => {
    fetch(buildUrl('/logout'), {
      method: 'get',
      credentials: "include"
    }).then((res) => {
      if (res.status) {
        dispatch(setId(null))
        dispatch(setSubjectList([]))
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
