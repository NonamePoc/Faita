import React from 'react'
import { ChatBlock } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRooms, createChatRoom } from '../redux/slices/user'

function Chats() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  const handleAddChat = () => {
    dispatch(createChatRoom('room1'))
  }

  return (
    <div>
      <button className='btn' onClick={handleAddChat}>
        Add Room
      </button>
      {user.rooms
        ? user.rooms.map((room, index) => <ChatBlock key={index} room={room} />)
        : null}
    </div>
  )
}

export default Chats
