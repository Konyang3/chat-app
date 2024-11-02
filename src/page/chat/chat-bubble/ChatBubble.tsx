import React from 'react'
import thumbs from '../../../asset/thumbs-up-line-icon.svg'

import "./ChatBubble.css"

type Props = {
    profileImg?: string
    chat: string
    like: number
}

function ChatBubble(props: Props) {
    return (
        <div className='ChatBubble'>
            {props.profileImg !== undefined && <img className='profile-img' src={props.profileImg} />}
            <div className='chatbubble-wrapper'>
                <span className='chat'>{props.chat}</span>
                <button><img src={thumbs} /> 나도 궁금해요 {props.like}</button>
            </div>
        </div>
    )
}

export default ChatBubble