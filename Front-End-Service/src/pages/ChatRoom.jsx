import React from 'react'
import { ChatHeader, ChatInput, ChatMessages } from '../components'

function ChatRoom() {
  return (
    <div className='chatroom'>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  )
}

export default ChatRoom
