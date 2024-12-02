import React, { useEffect, useState } from "react"

import './Chat.css'
import { useNavigate, useParams } from "react-router-dom"
import {format} from 'date-fns'
import Input from "../../component/input/Input"
import ChatBubble from "./chat-bubble/ChatBubble"
import { connect } from "socket.io-client"

import UpArrowIcon from "../../asset/up-arrow-icon.svg"
import Button from "../../component/button/Button"
import { useAppSelector } from "../../reducer/hook"
import { selectCurChatDate, selectCurChatIsClose } from "../../reducer/appSlice"

function Chat() {
    const { subjectName, subjectCode } = useParams()
    const [sendMessage, setSendMessage] = useState('')
    const [chatMessageList, setChatMessageList] = useState<Chat[]>([])
    const date = useAppSelector(selectCurChatDate)
    const isClose = useAppSelector(selectCurChatIsClose)
    const navigate = useNavigate()

    useEffect(() => {
        (async function() {
            if (date === null) return

            fetch('http://localhost:8080/chat-message-list', {
                method: 'post',
                body: JSON.stringify({date, subjectCode}),
                headers: {'content-type': "application/json"},
                credentials: "include"
            }).then((res) => {
                res.json().then((values) => {
                    const data = values.map((value: any) => ({...value, date: new Date(value.date)}))

                    setChatMessageList(data)
                }).catch(() => {
                    alert('채팅 내역을 불러오지 못했습니다.')
                })
            }).catch((e) => {
                alert('채팅 내역을 불러오지 못했습니다.')
            })
        })();
    }, [])

    // useEffect(() => {
    //     const socket = connect('http://localhost:8080', {'forceNew':true})

    //     socket.on('connect', function() {
    //         console.log('웹소켓에 연결되었습니다.')
    //      socket.on('message', function(message) {
    //          console.log(JSON.stringify(message));

    //          console.log('<p>수신 메시지 : ' + message.sender + ', ' + message.recepient + ', ' + message.command + ', ' + message.data + '</p>');
             
    //          console.log(message.data);
    //      });

    //      socket.on('response', function(response) {
    //          console.log(JSON.stringify(response));
    //          console.log('응답 메시지를 받았습니다. : ' + response.command + ', ' + response.code + ', ' + response.message);
    //      });
         
    //  });

    //  socket.on('disconnect', function() {
    //      console.log('웹소켓 연결이 종료되었습니다.');
    //  });
    // }, [])

    const send = () => {

    }

    const goToCalendar = () => {
        navigate(`/chat/${subjectCode}/${subjectName}/calendar`)
    }

    const closeChat = () => {
        fetch('http://localhost:8080/close-chat', {
            method: 'post',
            body: JSON.stringify({subjectCode, date}),
            headers: {'content-type': "application/json"},
            credentials: "include"
        }).then((res) => {
            if (res.status === 200) {
                goToCalendar()
            } else {
                alert('채팅 종료를 실패하였습니다.')
            }
        }).catch(() => {
            alert('채팅 종료를 실패하였습니다.')
        })
    }

    return (
        <div className="Chat">
            <div className="chat-area">
                <h1>{subjectName}</h1>
                <hr></hr>
                <div className="date"><time>{format(new Date(), 'yyyy-MM-dd')}</time></div>
                <div className="chat-list">
                    {chatMessageList.map((chat) => {
                        return <ChatBubble key={chat.id} profileImg={''} chat={chat.message} like={chat.empathy} />
                    })}
                </div>
                <div className="input-area">
                    <Input placeholder="채팅 입력창" value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} />
                    <button className="send-btn" onClick={send}><img src={UpArrowIcon}></img></button>
                </div>
            </div>
            <div className="best-chat-area">
                <div className="date">
                    <time>{format(new Date(), 'yyyy-MM-dd')}</time>
                </div>
                <div className="chat-list">
                    {chatMessageList.map((chat) => {
                        return <ChatBubble key={chat.id} chat={chat.message} like={chat.empathy} />
                    })}
                </div>
                <div className="footer">
                    <Button onClick={goToCalendar}>캘린더 보기</Button>
                    {isClose ? null : <Button onClick={closeChat}>채팅 종료하기</Button>}
                </div>
            </div>
        </div>
    )
}

export default Chat

type Chat = {
    sender: string
    message: string
    id: string
    date: Date
    empathy: number
}