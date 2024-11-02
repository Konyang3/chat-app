import React from "react"

import './Login.css'
import Button from "../../component/button/Button"
import Input from "../../component/input/Input"

function Login() {
    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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