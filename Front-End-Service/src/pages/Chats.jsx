import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatBlock } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRooms, createChatRoom } from '../redux/slices/user'
import { joinToRoom } from '../redux/slices/chat'

function Chats() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  const onClickAddChat = (friend) => {
    const room = user.rooms.find((room) =>
      room.users.some((user) => user.id === friend.id)
    )
    if (room) {
      navigate(`/chat/${room.id}`)
    } else {
      dispatch(createChatRoom(`${user.userName}, ${friend.userName}`))
      dispatch(joinToRoom(friend.id))
    }
  }

  return (
    <div>
      <button className='btn' onClick={() => setIsModalOpen(true)}>
        Click there to start chat with
      </button>

      {user.rooms
        ? user.rooms.map((room, index) => <ChatBlock key={index} room={room} />)
        : null}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}></div>
      <div className={`modal card ${isModalOpen ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Chat with...</h2>
          <span className='close' onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <ul className='modal-friend-list'>
            {user.friends.map((friend, index) => (
              <li key={index} className='modal-friend'>
                <div className='flex'>
                  <img
                    src='https://picsum.photos/id/235/20'
                    alt='User avatar'
                  />
                  <h3 className='modal-friend-name'>{friend.userName}</h3>
                </div>
                <button className='btn' onClick={() => onClickAddChat(friend)}>
                  Choose
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Chats
