import React from 'react'
import { useNavigate } from 'react-router-dom'

function ChatBlock({ room }) {
  const navigate = useNavigate()

  const onClickRoom = (roomId) => {
    navigate(`/chat/${roomId}`)
  }

  return (
    <>
      <section onClick={() => onClickRoom(room.id)}>
        <div className='chat card'>
          <img
            className='chat__img'
            src='https://picsum.photos/id/858/200'
            alt='profile-img'
          />
          <div className='chat__info'>
            <div className='chat__info__firstLine'>
              <h1 className='chat__name'>{room.name}</h1>
              <div className='statusCircle'></div>
            </div>
            <p className='chat__message'>
              {room.messages
                ? room.messages[room.messages.length - 1]
                : 'No messages yet'}
            </p>
          </div>
          <div className='chat__info right'>
            <p className='chat__date'>12 mins ago</p>
            <div className='msgCounter'>7</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ChatBlock
