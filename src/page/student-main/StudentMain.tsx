import React from 'react'
import Card, { CardType } from './card/Card'

import './StudentMain.css'

function StudentMain() {
    const classList: CardType[] = [
        {subjectName: '소프트웨어 공학', professorName: '송기원', nameOfClass: '01분반'}, 
        {subjectName: '융합설계 및 프로젝트 II', professorName: '김진수', nameOfClass: '01분반'}, 
        {subjectName: '알고리즘', professorName: '김병익', nameOfClass: '01분반'},
        {subjectName: '빅데이터 응용', professorName: '김진수', nameOfClass: '01분반'},
        {subjectName: '데이터베이스', professorName: '허용도', nameOfClass: '01분반'}
    ]

    const enterClass = () => {}

    return (
        <div className='StudentMain'>
            <div className='content'>
                {classList.map((item) => {
                    return <Card subjectName={item.subjectName} professorName={item.professorName} nameOfClass={item.nameOfClass} onEnter={enterClass} />
                })}
            </div>
        </div>
    )
}

export default StudentMain
