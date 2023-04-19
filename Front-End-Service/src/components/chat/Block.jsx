import React from 'react'
import { useNavigate } from 'react-router-dom'

function ChatBlock({ room }) {
  const navigate = useNavigate()

  const onClickRoom = (roomId) => {
    navigate(`/chat/${roomId}`)
  }

  const getLastMessage = (messages) => {
    let sortedMessages = [...messages].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    const currentTime = new Date()
    if (sortedMessages.length) {
      const lastMessageTime = new Date(sortedMessages[0].createdAt)
      const timeElapsedInMilliseconds =
        currentTime.getTime() - lastMessageTime.getTime()
      const timeElapsedInMinutes = Math.floor(
        timeElapsedInMilliseconds / 1000 / 60
      )
      const [text] =
        sortedMessages[0].text.length > 200
          ? [sortedMessages[0].text.slice(0, 170) + '...']
          : [sortedMessages[0].text]
      return [text, timeElapsedInMinutes]
    }
    return 'No messages yet'
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
            <p className='chat__message'>{getLastMessage(room.messages)[0]}</p>
          </div>
          <div className='chat__info right'>
            <p className='chat__date'>
              {getLastMessage(room.messages)[1]} mins ago
            </p>
            <div className='msgCounter'>7</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ChatBlock
