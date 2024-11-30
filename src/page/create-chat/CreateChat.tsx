import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../component/input/Input'
import Button from '../../component/button/Button'

import "./CreateChat.css"

function CreateChat() {
    const navigate = useNavigate()
    const [professorName, setProfessorName] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const [className, setClassName] = useState('')

    const createChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            navigate(`/chat/${subjectCode}`)
        } catch {
            alert('과목 생성에 실패하였습니다.')
        }
    }

    return (
        <div className="CreateChat">
            <header>채팅방 생성</header>
            <form onSubmit={createChat}>
                <Input placeholder="교수 이름 입력" value={professorName} onChange={(e) => setProfessorName(e.target.value)}></Input>
                <Input placeholder="과목 이름 입력" value={subjectName} onChange={(e) => setSubjectName(e.target.value)}></Input>
                <Input placeholder="과목 코드 입력" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}></Input>
                <Input placeholder="분반 입력" value={className} onChange={(e) => setClassName(e.target.value)}></Input>
                <Button>채팅방 생성</Button>
            </form>
        </div>
    )
}

export default CreateChat