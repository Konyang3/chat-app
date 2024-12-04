import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../component/input/Input'
import Button from '../../component/button/Button'

import "./JoinChat.css"
import { useAppDispatch, useAppSelector } from '../../reducer/hook'
import { selectSubjectList, setSubjectList } from '../../reducer/appSlice'

function JoinChat() {
    const navigate = useNavigate()
    const [subjectCode, setSubjectCode] = useState('')
    const dispatch = useAppDispatch()
    const subjectList = useAppSelector(selectSubjectList)

    const joinChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (subjectCode.length !== 8) {
            alert('과목 코드는 8자입니다.')
            return
        }
        
        fetch('http://localhost:8080/join-subject',
            {method: 'post', body: JSON.stringify({subjectCode}), headers: {'content-type': "application/json"}, credentials: "include"}
        ).then((res) => {
            dispatch(setSubjectList(subjectList.concat(subjectCode)))
            navigate('/main')
        }).catch((e) => {
            alert('채팅방 가입에 실패하였습니다.')
        })
    }

    return (
        <div className="JoinChat">
            <header>채팅방 가입</header>
            <form onSubmit={joinChat}>
                <Input placeholder="채팅방 코드 입력" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}></Input>
                <Button>채팅방 가입</Button>
            </form>
        </div>
    )
}

export default JoinChat