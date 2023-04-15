import React from 'react'
import { ChatBlock } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import * as signalR from '@microsoft/signalr'
import { fetchRooms, createChatRoom } from '../redux/slices/user'

function Chats() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

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

  React.useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  const handleAddChat = () => {
    dispatch(createChatRoom('room1'))
  }

  return (
    <div>
      {user.rooms
        ? user.rooms.map((room, index) => <ChatBlock key={index} />)
        : null}
      <button className='btn' onClick={handleAddChat}>
        Add Room
      </button>
    </div>
  )
}

export default Chats
