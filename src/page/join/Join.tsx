import React, { useState } from 'react'
import Button from '../../component/button/Button'
import Input from '../../component/input/Input'

import './Join.css'
import { useNavigate } from 'react-router-dom'

function Join() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }

        try {
            const res = await fetch('http://localhost:8080/register', {method: 'post', body: JSON.stringify({id, password, name}), headers: {'content-type': "application/json"}})
            if (res.status === 200) {
                alert("회원가입에 성공하였습니다.")
                navigate('/login')
            } else {
                alert("회원가입에 실패하였습니다.")
            }
        } catch(e) {
            console.log(e)
            alert("회원가입에 실패하였습니다.")
        }
    }

    //TODO:: 학번으로 교수, 학생 구분 교수는 자리, 학생은 8자리

    return (
        <div className="Join">
            <header>JOIN</header>
            <form onSubmit={signUp}>
                <Input placeholder="학번 입력" value={id} onChange={(e) => setId(e.target.value)}></Input>
                <Input placeholder="PW 입력" type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                <Input placeholder="PW 확인" type={"password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}></Input>
                <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}></Input>
                <Button className='join-btn'>회원가입</Button>
            </form>
        </div>
    )
}

export default Join