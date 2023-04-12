import React from 'react'
import { ChatBlock } from '../components'
import { useSelector } from 'react-redux'
import * as signalR from '@microsoft/signalr'

function Chats() {
  const user = useSelector((state) => state.user)

  React.useEffect(() => {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7206/chatHub')
      .configureLogging(signalR.LogLevel.Information)
      .build()

    connection.on('ReceiveMessage', (user, receiver, message) => {
      console.log(user, receiver, message)
      connection.invoke('JoinRoom', { room: 'room1', user: user.id })
      console.log('joined room')
    })

    connection.start()
  }, [user.id])

  return (
    <div>
      <ChatBlock />
      <ChatBlock />
    </div>
  )
}

export default Chats
