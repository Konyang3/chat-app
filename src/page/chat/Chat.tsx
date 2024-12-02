import React from "react"

import './Chat.css'
import { useParams } from "react-router-dom"
import {format} from 'date-fns'
import Input from "../../component/input/Input"
import ChatBubble from "./chat-bubble/ChatBubble"

import UpArrowIcon from "../../asset/up-arrow-icon.svg"
import Button from "../../component/button/Button"

function Chat() {
    const { subjectName } = useParams()

    const chatList = [
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 2},
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 3},
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 1},
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 0},
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 0},
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 0},
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 0},
    ]

    const bestChatList = [
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 3},
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 2},
        {profileImg: "asdfasdf", chat: "교수님 질문있습니다.", like: 1},
    ]

    return (
        <div className="Chat">
            <div className="chat-area">
                <h1>{subjectName}</h1>
                <hr></hr>
                <div className="date"><time>{format(new Date(), 'yyyy-MM-dd')}</time></div>
                <div className="chat-list">
                    {chatList.map((chat) => {
                        return <ChatBubble key={chat.chat} profileImg={chat.profileImg} chat={chat.chat} like={chat.like} />
                    })}
                </div>
                <div className="input-area">
                    <Input placeholder="채팅 입력창" />
                    <button className="send-btn"><img src={UpArrowIcon}></img></button>
                </div>
            </div>
            <div className="best-chat-area">
                <div className="date">
                    <time>{format(new Date(), 'yyyy-MM-dd')}</time>
                </div>
                <div className="chat-list">
                    {bestChatList.map((chat) => {
                        return <ChatBubble key={chat.chat} chat={chat.chat} like={chat.like} />
                    })}
                </div>
                <div className="footer">
                    <Button>캘린더 보기</Button>
                    <Button>채팅 종료하기</Button>
                </div>
            </div>
        </div>
    )
}

export default Chat