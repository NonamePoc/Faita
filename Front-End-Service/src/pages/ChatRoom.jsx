import React from 'react'
import { ChatHeader, ChatInput, ChatMessages } from '../components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRoom, exitRoom } from '../redux/slices/chat'

function ChatRoom() {
  const { roomId } = useParams()
  const [loading, setLoading] = React.useState(true)
  const user = useSelector((state) => state.user)
  const room = user.rooms.find((room) => room.id === roomId)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (room) {
      dispatch(setRoom(room))
    }
    setLoading(false)
    return () => {
      dispatch(exitRoom(null))
    }
  }, [dispatch, room])

  return (
    <main className='chatroom'>
      {room && !loading ? (
        <>
          <ChatHeader />
          <ChatMessages />
          <ChatInput />
        </>
      ) : (
        <div className='chatroom__empty'>
          {loading ? <h3>Loading...</h3> : <h3>Chat Room is Empty</h3>}
        </div>
      )}
    </main>
  )
}

export default ChatRoom
