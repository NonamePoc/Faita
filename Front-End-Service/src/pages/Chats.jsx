import React from 'react'
import { ChatBlock } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRooms } from '../redux/asyncThunks/chats'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Chats() {
  const rooms = useSelector((state) => state.chats.rooms)
  const roomsLoaded = useSelector((state) => state.chats.roomsLoaded)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  return (
    <div>
      {roomsLoaded ? (
        rooms.length > 0 &&
        rooms.map((room, index) => <ChatBlock key={index} room={room} />)
      ) : (
        <Skeleton count={5} height={200} />
      )}
    </div>
  )
}

export default Chats
