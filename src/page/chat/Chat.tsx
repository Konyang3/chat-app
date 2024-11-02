import React from "react"

import './Chat.css'
import { useParams } from "react-router-dom"
import {format} from 'date-fns'
import Input from "../../component/input/Input"
import ChatBubble from "./chat-bubble/ChatBubble"

import UpArrowIcon from "../../asset/up-arrow-icon.svg"

function Chat() {
    const {subjectName} = useParams()

    const chatList = [
        {profileImg: "asdfasdf", chat: "asdfaaaaaaaaaaaaaaaaaa", like: 0},
        {profileImg: "asdfasdf", chat: "asdfaaaaaaaaaaaaaaaaa", like: 0},
        {profileImg: "asdfasdf", chat: "asdfaaaaaaasdfasdfasdf", like: 0},
        {profileImg: "asdfasdf", chat: "asdfasdfasdfasdfasdfasdf", like: 0},
        {profileImg: "asdfasdf", chat: "asdfasdfasdfasdfasdfa", like: 0},
        {profileImg: "asdfasdf", chat: "asdfasdfasdfasdfasdfasdf", like: 0},
        {profileImg: "asdfasdf", chat: "asdfasdfasdfasdfasdfaf", like: 0},
    ]

    const bestChatList = [
        {profileImg: "asdfasdf", chat: "asdfaaaaaaaaaaaaaaaaaa", like: 3},
        {profileImg: "asdfasdf", chat: "asdfaaaaaaaaaaaaaaaaa", like: 2},
        {profileImg: "asdfasdf", chat: "asdfaaaaaaasdfasdfdf", like: 1},
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
            <div className="date"><time>{format(new Date(), 'yyyy-MM-dd')}</time></div>
                <div className="chat-list">
                    {bestChatList.map((chat) => {
                        return <ChatBubble key={chat.chat} chat={chat.chat} like={chat.like} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Chat