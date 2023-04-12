import React from 'react'
import * as signalR from '@microsoft/signalr'
import { ChatHeader, ChatInput, ChatMessages } from '../components'
import { useSelector } from 'react-redux'

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
