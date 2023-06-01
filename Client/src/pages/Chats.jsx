import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector, useDispatch } from 'react-redux'
import { ChatBlock } from '../components'
import { fetchRooms } from '../redux/asyncThunks/chats'
import getLastMessage from '../utils/getLastMessage'
import extractTime from '../utils/extractTime'

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
          [...rooms]
            .sort((a, b) => {
              const lastMessageA = getLastMessage(a.messages?.$values)[1]
              const lastMessageB = getLastMessage(b.messages?.$values)[1]
              const timeA = extractTime(lastMessageA)
              const timeB = extractTime(lastMessageB)
              return timeA !== timeB
                ? timeA - timeB
                : new Date(lastMessageA) - new Date(lastMessageB)
            })
            .map((room, index) => <ChatBlock key={index} room={room} />)
        ) : (
          <h3 className='title'>You have no chats</h3>
        )
      ) : (
        <Skeleton count={5} height={200} />
      )}
    </section>
  )
}

export default Chats
