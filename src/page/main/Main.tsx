import React, { useEffect, useState } from 'react'
import Card, { CardType } from './card/Card'

import './Main.css'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../reducer/hook'
import { selectIsStudent, selectSubjectList } from '../../reducer/appSlice'

function Main() {
    const navigate = useNavigate()
    const [classList, setClassList] = useState<CardType[]>([])
    const subjectList = useAppSelector(selectSubjectList)

    useEffect(() => {
        const getClassList = async () => {
            if (subjectList.length === 0) return
            try {
                const response = await fetch(
                    'http://localhost:8080/subject-list', 
                    {
                        method: 'post',
                        body: JSON.stringify({subjectCodes: subjectList}), 
                        headers: {'content-type': "application/json"},
                        credentials: "include"
                    });
                const data = await response.json()
                setClassList(data.map((value: any) => {
                    return {subjectName: value.subject_name, professorName: value.professor_name, nameOfClass: value.separated_class}
                }))
            } catch {
                alert('과목 정보들을 불러오는데 실패하였습니다.')
            }
        }

        getClassList()
    }, [subjectList])

    const enterClass = (subjectName: string) => {
        navigate('/chat/' + subjectName)
    }

    return (
        <div className='Main'>
            <div className='content'>
                {classList.map((item) => {
                    return <Card key={item.subjectName} subjectName={item.subjectName} professorName={item.professorName} nameOfClass={item.nameOfClass} onEnter={enterClass} />
                })}
                <CreateChatRoom />
            </div>
        </div>
    )
}

export default Main

function CreateChatRoom() {
    const navigate = useNavigate()
    const isStudent = useAppSelector(selectIsStudent)

    const goToCreateChatRoom = () => {
        isStudent ? navigate('/join-chat') : navigate("/create-chat")
    }

    return <div className='Card CreateChatRoom' onClick={goToCreateChatRoom}>+</div>
}

