import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./JoinChat.css"
import { useAppDispatch, useAppSelector } from '../../reducer/hook'
import { selectSubjectList, setSubjectList } from '../../reducer/appSlice'
import { buildUrl } from '../../util/util'
import { Button, Input } from 'antd'

function JoinChat() {
    const navigate = useNavigate()
    const [subjectCode, setSubjectCode] = useState('')
    const dispatch = useAppDispatch()
    const subjectList = useAppSelector(selectSubjectList)

    const joinChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (subjectCode.length === 0) {
            alert('과목 코드를 입력해주세요.')
            return
        }
        
        fetch(buildUrl('/join-subject'),
            {method: 'post', body: JSON.stringify({subjectCode}), headers: {'content-type': "application/json"}, credentials: "include"}
        ).then((res) => {
            if (res.status === 200) {
                dispatch(setSubjectList(subjectList.concat(subjectCode)))
                navigate('/main')
            } else {
                alert('채팅방 가입에 실패하였습니다.')
            }
        }).catch((e) => {
            alert('채팅방 가입에 실패하였습니다.')
        })
    }

    return (
        <div className="JoinChat">
            <header>채팅방 가입</header>
            <form onSubmit={joinChat}>
                <Input size='large' placeholder="채팅방 코드 입력" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}></Input>
                <Button htmlType='submit'>채팅방 가입</Button>
            </form>
        </div>
    )
}

export default JoinChat