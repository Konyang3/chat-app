import React, { useState } from 'react'

import './Join.css'
import { useNavigate } from 'react-router-dom'
import { aesEncrypt, buildUrl, isNumeric } from '../../util/util'
import { Button, Input, Radio } from 'antd'

function Join() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }

        if (password.length < 8) {
            alert('최소 비밀번호 길이는 8자 입니다.')
            return
        }

        if (name.length === 0) {
            alert('이름을 입력해주세요.')
            return
        }

        if (name.length > 12) {
            alert('최대 이름 길이는 12글자 입니다.')
            return
        }

        try {
            const res = await fetch(buildUrl('/register'), {method: 'post', body: JSON.stringify({id, password: aesEncrypt(password), name}), headers: {'content-type': "application/json"}})
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

    return (
        <div className="Join">
            <header>JOIN</header>
            <form onSubmit={signUp}>
                <Input size='large' placeholder="학번 입력" value={id} onChange={(e) => setId(e.target.value)}></Input>
                <Input size='large' placeholder="PW 입력" type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                <Input size='large' placeholder="PW 확인" type={"password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}></Input>
                <Input size='large' placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}></Input>
                <Radio.Group
                    style={{width: "100%"}}
                    block
                    options={[
                        { label: '교수', value: '교수' },
                        { label: '학생', value: '학생' },
                      ]}
                    defaultValue="Apple"
                    optionType="button"
                    buttonStyle="solid"
                />
                <Button htmlType='submit'>회원가입</Button>
            </form>
        </div>
    )
}

export default Join