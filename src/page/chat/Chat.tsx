import React, { useEffect, useState } from "react"

import './Chat.css'
import { useNavigate, useParams } from "react-router-dom"
import {format} from 'date-fns'
import ChatBubble from "./chat-bubble/ChatBubble"
import { connect, Socket } from "socket.io-client"

import UpArrowIcon from "../../asset/up-arrow-icon.svg"
import { useAppSelector } from "../../reducer/hook"
import { selectId, selectIsStudent } from "../../reducer/appSlice"
import { badWords } from "./badWord"
import { buildUrl } from "../../util/util"
import { Button, Input } from "antd"
import { ArrowUpOutlined } from "@ant-design/icons"

function Chat() {
    const { subjectName, subjectCode, date } = useParams()
    const [sendMessage, setSendMessage] = useState('')
    const [chatMessageList, setChatMessageList] = useState<Chat[]>([])
    const [socket, setSocket] = useState<Socket>()
    const [isClose, setIsClose] = useState(false)
    const isStudent = useAppSelector(selectIsStudent)
    const id = useAppSelector(selectId)
    const navigate = useNavigate()

    useEffect(() => {
        (async function() {
            if (date === undefined) return

            fetch(buildUrl('/chat-message-list'), {
                method: 'post',
                body: JSON.stringify({date, subjectCode}),
                headers: {'content-type': "application/json"},
                credentials: "include"
            }).then((res) => {
                res.json().then((values) => {
                    const data = values.map((value: any) => {
                            const empathy = value.empathy.split(',').filter((value: string) => value.length !== 0)
                            return {...value, date: new Date(value.date), empathy: empathy}
                        })

                    setChatMessageList(data)
                }).catch(() => {
                    alert('채팅 내역을 불러오지 못했습니다.')
                })
            }).catch((e) => {
                alert('채팅 내역을 불러오지 못했습니다.')
            })

            fetch(buildUrl('/chat-date-list'), {
                method: 'post',
                body: JSON.stringify({startDate: date, endDate: date, subjectCode}),
                headers: {'content-type': "application/json"},
                credentials: "include"
            }).then((res) => {
                res.json().then((value) => {
                    setIsClose(Boolean(value[0]?.close))
                })
            }).catch(() => {})
        })();
    }, [])

    useEffect(() => {
        if (date === undefined) return
        if (id === null) return

        const socket = connect('http://localhost:8080', {'forceNew':true})
        setSocket(socket)

        socket.on('connect', function() {
            console.log('웹소켓 서버에 연결되었습니다.');

            // 그룹 채팅에서 방과 관련된 이벤트 처리
            socket.on('room', function(data) {
                console.log(JSON.stringify(data));

                console.log('방 이벤트 : ' + data.command);
            });

        });

        socket.on('disconnect', function() {
            console.log('웹소켓 연결이 종료되었습니다.');
        });

        const loginData = { id:id };
        console.log('서버로 보낼 데이터 : ' + JSON.stringify(loginData));

        if (socket == undefined) {
            alert('서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.');
            return;
        }

        socket.emit('login', loginData);

        const roomId = subjectCode + "_" + date

        const output = {command:'create', roomId:roomId, roomName:subjectName, roomOwner:id};
        console.log('서버로 보낼 데이터 : ' + JSON.stringify(output));

        if (socket == undefined) {
            alert('서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.');
            return;
        }

        socket.emit('room', output);

        const joinData = {command:'join', roomId:roomId};
        console.log('서버로 보낼 데이터 : ' + JSON.stringify(joinData));

        if (socket == undefined) {
            alert('서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.');
            return;
        }

        socket.emit('room', joinData);

        return () => {
            var output = {command:'leave', roomId:roomId};
            console.log('서버로 보낼 데이터 : ' + JSON.stringify(output));

            if (socket == undefined) {
                alert('서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.');
                return;
            }

            socket.emit('room', output);
        }
    }, [id])

    useEffect(() => {
        if (socket === undefined) return
        if (id === null) return

        socket.on('message', function(message) {
            console.log(JSON.stringify(message));

            console.log('수신 메시지 : ' + message.sender + ', ' + message.recepient + ', ' + message.data);
            setChatMessageList(chatMessageList.concat([{sender: message.sender, message: message.data, id: message.id, date: new Date(message.date), empathy: []}]))
        });

        socket.on('empathy', function(message) {
            const newChatMessageList = chatMessageList.map((chat) => {
                console.log(chat.id, message, chat.empathy)
                if (chat.id === message.messageId) {
                    chat.empathy = message.empathy
                }
                return chat
            })
            console.log(newChatMessageList)

            setChatMessageList(newChatMessageList)
        })

        return () => {
            socket.removeListener('empathy')
            socket.removeListener('message')
        }
    }, [socket, chatMessageList])

    const send = () => {
        if (date === undefined) return
        if (sendMessage === '') return
        if (filterText(sendMessage)) {
            alert('비속어 사용이 금지되어있습니다.')
            return
        }
        const roomId = subjectCode + "_" + date

        var output = {sender: id, recepient: roomId, type:'text', data: sendMessage, date: new Date(), subjectCode, chatRoomDate: date};
        console.log('서버로 보낼 데이터 : ' + JSON.stringify(output));

        if (socket == undefined) {
            alert('서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.');
            return;
        }

        socket.emit('message', output);
    }

    const goToCalendar = () => {
        navigate(`/chat/${subjectCode}/${subjectName}/calendar`)
    }

    const closeChat = () => {
        fetch(buildUrl('/close-chat'), {
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

    const like = (messageId: string) => {
        if (date === undefined) return
        const roomId = subjectCode + "_" + date

        var output = {messageId: messageId, sender: id, recepient: roomId};
        console.log('서버로 보낼 데이터 : ' + JSON.stringify(output));

        if (socket == undefined) {
            alert('서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.');
            return;
        }

        socket.emit('empathy', output);
    }

    return (
        <div className="Chat">
            <div className="chat-area">
                <h1>{subjectName}</h1>
                <hr></hr>
                <div className="date"><time>{date}</time></div>
                <div className="chat-list">
                    {chatMessageList.map((chat) => {
                        return <ChatBubble key={chat.id} messageId={chat.id} profileImg={''} chat={chat.message} like={chat.empathy.length} onClickLike={like} sender={chat.sender} />
                    })}
                </div>
                {isClose ? null : 
                    <div className="input-area">
                        <Input
                            placeholder="채팅 입력창" 
                            value={sendMessage} 
                            onKeyDown={(e) => {
                                if (!e.shiftKey && e.key === 'Enter') send()
                            }} 
                            onChange={(e) => setSendMessage(e.target.value)} 
                        />
                        <Button size="large" shape="circle" icon={<ArrowUpOutlined />} onClick={send} type="primary"></Button>
                    </div>
                }
            </div>
            <div className="best-chat-area">
                <div className="date">
                    <time>{format(new Date(), 'yyyy-MM-dd')}</time>
                </div>
                <div className="chat-list">
                    {getBestChat(chatMessageList).map((chat) => {
                        return <ChatBubble key={chat.id} messageId={chat.id} chat={chat.message} like={chat.empathy.length} onClickLike={like} sender={chat.sender} />
                    })}
                </div>
                <div className="footer">
                    <Button onClick={goToCalendar}>캘린더 보기</Button>
                    {isClose || isStudent ? null : <Button onClick={closeChat}>채팅 종료하기</Button>}
                </div>
            </div>
        </div>
    )
}

export default Chat

type Chat = {
    sender?: string
    message: string
    id: string
    date: Date
    empathy: string[]
}

function getBestChat(chatMessageList: Chat[]) {
    const sortedList = chatMessageList.filter((chat) => chat.empathy.length !== 0).sort((a, b) => {
        if (a.empathy.length > b.empathy.length) {
            return -1;
          }
          if (a.empathy.length < b.empathy.length) {
            return 1;
          }
          return 0;
    }).slice(0, 3)

    return sortedList
}

function filterText(inputText: string) {
    // 비속어 유효성 검사
    for (const word of badWords) {
      const regex = new RegExp(word, "gi");
      if (regex.test(inputText)) {
            return true;
        }
    }

    return false;
}