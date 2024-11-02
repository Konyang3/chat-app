import React from 'react'
import Button from '../../component/button/Button'
import Input from '../../component/input/Input'

import './Join.css'

function Join() {
    const signUp = (e: React.FormEvent<HTMLFormElement>) => {

    }

    return (
        <div className="Join">
            <header>JOIN</header>
            <form onSubmit={signUp}>
                <div className='id'>
                    <Input placeholder="ID 입력"></Input>
                    <Button>ID 중복 확인</Button>
                </div>
                <Input placeholder="PW 입력"></Input>
                <Input placeholder="PW 확인"></Input>
                <Input placeholder="이름"></Input>
                <Input placeholder="학번"></Input>
                <Button className='join-btn'>회원가입</Button>
            </form>
        </div>
    )
}

export default Join