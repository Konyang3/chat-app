import React from "react"

import "./Card.css"
import { Button, Card as AntdCard } from "antd"

type Props = {
    onEnter: (subjectName: string, subjectCode: string) => void
} & CardType

function Card(props: Props) {
    return (
        <AntdCard className="Card" title={props.subjectName} extra={<Button onClick={() => props.onEnter(props.subjectName, props.subjectCode)}>입장</Button>}>
            <p>교수명: {props.professorName}</p>
            <p>분반: {props.nameOfClass}</p>
        </AntdCard>
    )
}

export default Card

export type CardType = {
    subjectName: string
    professorName: string
    nameOfClass: string
    subjectCode: string
}