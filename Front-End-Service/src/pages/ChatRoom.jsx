import React from 'react'
import { ChatHeader, ChatInput, ChatMessages } from '../components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRoom } from '../redux/slices/chat'

function ChatRoom() {
  const { roomId } = useParams()
  const user = useSelector((state) => state.user)
  const room = user.rooms.find((room) => room.id === roomId)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setRoom(room))
  })

  return (
    <main className='chatroom'>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </main>
  )
}

export default ChatRoom
