import React from "react"

import './Login.css'
import Button from "../../component/button/Button"
import Input from "../../component/input/Input"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //TODO:: 로그인 성공 시
        navigate('/student-main')
    }

    return (
        <div className="Login">
            <header>LOGIN</header>
            <form onSubmit={login}>
                <Input placeholder="ID 입력"></Input>
                <Input placeholder="PW 입력"></Input>
                <Button>로그인</Button>
            </form>
        </div>
    )
}

export default Login