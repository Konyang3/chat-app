import React, { useState } from "react"

import './Login.css'
import Button from "../../component/button/Button"
import Input from "../../component/input/Input"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../reducer/hook"
import { setSubjectList, setId as setStoreId } from "../../reducer/appSlice"

function Login() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetch('http://localhost:8080/login', 
            { method: 'post', body: JSON.stringify({ id, password }), headers: {'content-type': "application/json"}, credentials: "include" }
        ).then((res) => {
            if(res.status === 200) {
                res.json().then((value) => {
                    const subjectCodes = value.subject_codes ? value.subject_codes : []

                    dispatch(setSubjectList(subjectCodes))
                    dispatch(setStoreId(value.id))
                })
                navigate('/main')
            } else {
                alert('로그인에 실패하였습니다.')    
            }
        }).catch(() => {
            alert('로그인에 실패하였습니다.')
        })
    }

    return (
        <div className="Login">
            <header>LOGIN</header>
            <form onSubmit={login}>
                <Input placeholder="학번 입력" value={id} onChange={(e) => setId(e.target.value)}></Input>
                <Input placeholder="PW 입력" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                <Button>로그인</Button>
            </form>
        </div>
    )
}

export default Login