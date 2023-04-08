import React from 'react'
import { ChatHeader, ChatInput, ChatMessages } from '../components'

function ChatRoom() {
  return (
    <main className='chatroom'>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </main>
  )
}

export default ChatRoom
