import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector, useDispatch } from 'react-redux'
import { ChatBlock } from '../components'
import { fetchRooms } from '../redux/asyncThunks/chats'

function Chats() {
  const { rooms, roomsLoaded } = useSelector((state) => state.chats)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  return (
    <section>
      {roomsLoaded ? (
        rooms.length > 0 ? (
          rooms.map((room, index) => <ChatBlock key={index} room={room} />)
        ) : (
          <h3>You have no chats</h3>
        )
      ) : (
        <Skeleton count={5} height={200} />
      )}
    </section>
  )
}

export default Chats
