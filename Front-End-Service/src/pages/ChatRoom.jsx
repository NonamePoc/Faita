import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChatHeader, ChatInput, ChatMessages } from '../components'
import Skeleton from 'react-loading-skeleton'

function ChatRoom() {
  const { roomId } = useParams()
  const { rooms } = useSelector((state) => state.chats)
  const room = rooms.find((room) => room.chatId === roomId)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    room && setLoaded(true)
  }, [room])

  return (
    <main className='chatroom'>
      {loaded ? (
        <>
          <ChatHeader room={room} />
          <ChatMessages room={room} />
          <ChatInput room={room} />
        </>
      ) : (
        <div className='chatroom__empty'>
          <Skeleton height={500} />
        </div>
      )}
    </main>
  )
}

export default React.memo(ChatRoom)
