import React from 'react'
import { ChatHeader, ChatInput } from '../components'

function ChatRoom() {
  return (
    <div className='chatroom'>
      <ChatHeader />
      <div className='chatroom__chat'></div>
      <ChatInput />
    </div>
  )
}

export default ChatRoom
