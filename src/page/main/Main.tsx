import React, { useEffect, useState } from 'react'
import Card, { CardType } from './card/Card'

import './Main.css'
import { useNavigate } from 'react-router-dom'

function Main() {
    const navigate = useNavigate()
    const [classList, setClassList] = useState<CardType[]>([])

    useEffect(() => {
        const getClassList = async () => {
            try {
                const response = await fetch('localhost:8080/subject-list', {method: 'get'})
                const data = await response.json()
                setClassList(data)
            } catch {
                alert('과목 정보들을 불러오는데 실패하였습니다.')
            }
        }

        getClassList()
    }, [])

    // const classList: CardType[] = [
    //     {subjectName: '소프트웨어 공학', professorName: '송기원', nameOfClass: '01분반'}, 
    //     {subjectName: '융합설계 및 프로젝트 II', professorName: '김진수', nameOfClass: '01분반'}, 
    //     {subjectName: '알고리즘', professorName: '김병익', nameOfClass: '01분반'},
    //     {subjectName: '빅데이터 응용', professorName: '김진수', nameOfClass: '01분반'},
    //     {subjectName: '데이터베이스', professorName: '허용도', nameOfClass: '01분반'}
    // ]

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

    const goToCreateChatRoom = () => {
        navigate("/create-chat")
    }

    return <div className='Card CreateChatRoom' onClick={goToCreateChatRoom}>+</div>
}

