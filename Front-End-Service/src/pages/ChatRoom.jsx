import React from 'react'
import { ChatHeader, ChatInput, ChatMessages } from '../components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function ChatRoom() {
  const { roomId } = useParams()
  const chats = useSelector((state) => state.chats.rooms)
  const [loaded, setLoaded] = React.useState(false)
  const room = chats.find((room) => room.id === roomId)
  const dispatch = useDispatch()

  React.useEffect(() => {
    console.log(room)
    if (room) {
      setLoaded(true)
    }
  }, [dispatch, room])

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
          {!loaded ? <h3>Loading...</h3> : <h3>Chat Room is Empty</h3>}
        </div>
      )}
    </main>
  )
}

export default ChatRoom
