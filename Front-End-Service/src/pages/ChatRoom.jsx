import React from 'react'
import * as signalR from '@microsoft/signalr'
import { ChatHeader, ChatInput, ChatMessages } from '../components'

function ChatRoom() {
  let connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7206/chatHub')
    .build()

  connection.on('ReceiveMessage', (user, receiver, message) => {
    console.log(user, receiver, message)
  })

  React.useEffect(() => {
    connection.start()
  }, [connection])

  return (
    <main className='chatroom'>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </main>
  )
}

export default ChatRoom
