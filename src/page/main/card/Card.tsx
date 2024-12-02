import React from "react"

import "./Card.css"
import Button from "../../../component/button/Button"

type Props = {
    onEnter: (subjectName: string, subjectCode: string) => void
} & CardType

function Card(props: Props) {
    return (
        <div className="Card">
            <h1>{props.subjectName}</h1>
            <p>교수명: {props.professorName}</p>
            <p>분반: {props.nameOfClass}</p>
            <Button onClick={() => props.onEnter(props.subjectName, props.subjectCode)}>입장</Button>
        </div>
    )
}

export default Card

export type CardType = {
    subjectName: string
    professorName: string
    nameOfClass: string
    subjectCode: string
}