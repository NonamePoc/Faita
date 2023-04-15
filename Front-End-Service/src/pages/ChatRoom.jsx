import React from 'react'
import { ChatHeader, ChatInput, ChatMessages } from '../components'
import { useParams } from 'react-router-dom'

function ChatRoom() {
  const { roomId } = useParams()
  return (
    <main className='chatroom'>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </main>
  )
}

export default ChatRoom
