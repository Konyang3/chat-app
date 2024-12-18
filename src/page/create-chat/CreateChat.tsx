import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./CreateChat.css"
import { buildUrl } from '../../util/util'
import { Button, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../../reducer/hook'
import { selectSubjectList, setSubjectList } from '../../reducer/appSlice'

function CreateChat() {
    const navigate = useNavigate()
    const [professorName, setProfessorName] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [className, setClassName] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const dispatch = useAppDispatch()
    const subjectList = useAppSelector(selectSubjectList)

    const createChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (className.length === 0) {
            alert('분반을 입력해주세요.')
            return
        }

        if (subjectName.length === 0) {
            alert('과목 이름을 입력해주세요.')
            return
        }

        if (professorName.length === 0) {
            alert('교수 이름을 입력해주세요.')
            return
        }

        if (className.length > 45) {
            alert('분반의 최대 길이는 45입니다.')
            return
        }

        if (subjectName.length > 45) {
            alert('과목 이름의 최대 길이는 45입니다.')
            return
        }

        if (professorName.length > 45) {
            alert('교수 이름의 최대 길이는 45입니다.')
            return
        }

        if (subjectCode.length === 0) {
            alert('과목 코드를 입력하세요.')
            return
        }

        const data = {
            subjectName: subjectName,
            professorName: professorName,
            separatedClass: className,
            subjectCode: subjectCode,
        }

        fetch(
            buildUrl('/create-subject'), 
            { method: "post", body: JSON.stringify(data), headers: {'content-type': "application/json"}, credentials: "include" }
        ).then((res) => {
            res.json().then((value) => {
                if (value?.subject_code && value.subject_name) {
                    dispatch(setSubjectList(subjectList.concat(value.subject_code)))
                    navigate(`/chat/${value.subject_code}/${value.subject_name}/calendar`)
                }
            })
        }).catch((e) => {
            alert('과목 생성에 실패하였습니다.')
        })

    }

    return (
        <div className="CreateChat">
            <header>채팅방 생성</header>
            <form onSubmit={createChat}>
                <Input size='large' placeholder="교수 이름 입력" value={professorName} onChange={(e) => setProfessorName(e.target.value)}></Input>
                <Input size='large' placeholder="과목 이름 입력" value={subjectName} onChange={(e) => setSubjectName(e.target.value)}></Input>
                <Input size='large' placeholder="분반 입력" value={className} onChange={(e) => setClassName(e.target.value)}></Input>
                <Input size='large' placeholder="과목 코드 입력" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}></Input>
                <Button htmlType='submit'>채팅방 생성</Button>
            </form>
        </div>
    )
}

export default CreateChat