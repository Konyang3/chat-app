import React, { useState } from "react"

import './Login.css'
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../reducer/hook"
import { setSubjectList, setId as setStoreId } from "../../reducer/appSlice"
import { aesEncrypt, buildUrl, isNumeric } from "../../util/util"
import { Button, Input } from "antd"

function Login() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (id.length === 0) {
            alert('학번을 입력해 주세요.')
            return
        }

        if (id.length > 8) {
            alert('학번은 8글자 이하입니다.')
            return
        }

        if (id.length < 6) {
            alert('학번은 최소 6글자입니다.')
            return
        }

        if (!isNumeric(id)) {
            alert('학번은 숫자만 입력해주세요.')
            return
        }

        if (password.length === 0) {
            alert('비밀번호를 입력해주세요.')
            return
        }

        if (password.length > 32) {
            alert('최대 비밀번호 길이는 32자 이하 입니다.')
            return
        }

        if (password.length < 8) {
            alert('최소 비밀번호 길이는 8자 입니다.')
            return
        }

        fetch(buildUrl('/login'), 
            { method: 'post', body: JSON.stringify({ id, password: aesEncrypt(password) }), headers: {'content-type': "application/json"}, credentials: "include" }
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
                <Input size="large" placeholder="학번 입력" value={id} onChange={(e) => setId(e.target.value)}></Input>
                <Input size="large" placeholder="PW 입력" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                <Button htmlType="submit">로그인</Button>
            </form>
        </div>
    )
}

export default Login
