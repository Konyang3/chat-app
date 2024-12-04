import React from 'react'
import thumbs from '../../../asset/thumbs-up-line-icon.svg'

import "./ChatBubble.css"
import { Avatar, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons';

type Props = {
    profileImg?: string
    chat: string
    like: number
    messageId: string
    sender?: string
    onClickLike: (messageId: string) => void
}

function ChatBubble(props: Props) {
    const content = (
        <div>보낸이: {props.sender}</div>
    )

    return (
        <div className='ChatBubble'>
            {
                props.sender ? 
                    <Popover content={content}>
                        <Avatar className='profile-img' icon={<UserOutlined />} />
                    </Popover> 
                    : <Avatar className='profile-img' icon={<UserOutlined />} />
            }
            <div className='chatbubble-wrapper'>
                <span className='chat'>{props.chat}</span>
                <button onClick={() => props.onClickLike(props.messageId)}><img src={thumbs} /> 나도 궁금해요 {props.like}</button>
            </div>
        </div>
    )
}

export default ChatBubble