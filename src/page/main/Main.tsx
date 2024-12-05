import React, { useEffect, useState } from 'react'
import Card, { CardType } from './card/Card'

import './Main.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../reducer/hook'
import { selectIsStudent, selectSubjectList, setId, setSubjectList } from '../../reducer/appSlice'
import { Button, Card as AntdCard } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { buildUrl } from '../../util/util'

function Main() {
    const navigate = useNavigate()
    const [classList, setClassList] = useState<CardType[]>([])
    const subjectList = useAppSelector(selectSubjectList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const getClassList = async () => {
            if (subjectList.length === 0) return
            try {
                const response = await fetch(
                    buildUrl('/subject-list'),
                    {
                        method: 'post',
                        body: JSON.stringify({subjectCodes: subjectList}), 
                        headers: {'content-type': "application/json"},
                        credentials: "include"
                    });
                const data = await response.json()
                setClassList(data.map((value: any) => {
                    return {subjectName: value.subject_name, professorName: value.professor_name, nameOfClass: value.separated_class, subjectCode: value.subject_code}
                }))
            } catch {
                alert('과목 정보들을 불러오는데 실패하였습니다.')
            }
        }

        getClassList()
    }, [subjectList])

    const enterClass = (subjectName: string, subjectCode: string) => {
        navigate(`/chat/${subjectCode}/${subjectName}/calendar`)
    }

    const logout = () => {
        fetch(buildUrl('/logout'), {
          method: 'get',
          credentials: "include"
        }).then((res) => {
          if (res.status) {
            dispatch(setId(null))
            dispatch(setSubjectList([]))
            navigate('/')
          }
        }).catch(() => {
          alert('로그아웃에 실패하였습니다.')
        })
      }

    return (
        <div className='Main'>
            <header>
                <Button onClick={logout}>로그아웃</Button>
            </header>
            <div className="container">
                <div className='content'>
                    {classList.map((item) => {
                        return <Card key={item.subjectName} subjectName={item.subjectName} subjectCode={item.subjectCode} professorName={item.professorName} nameOfClass={item.nameOfClass} onEnter={enterClass} />
                    })}
                    <CreateChatRoom />
                </div>
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

    return (
        <AntdCard className='CreateChatRoom' onClick={goToCreateChatRoom}>
            <div className='content'>
                <PlusOutlined />
            </div>
        </AntdCard>
    )
}

