import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setAvatar } from '../../utils/setAvatar'
import getLastMessage from '../../utils/getLastMessage'

function ChatBlock({ room }) {
  const navigate = useNavigate()
  const userId = useSelector((state) => state.user.id)
  const { avatar, userName } =
    room.users.$values.find((u) => u.id !== userId) || {}

  const onClickRoom = () => navigate(`/chat/${room.chatId}`)

  const [lastMessageText, formattedTime] = getLastMessage(room.messages.$values)

  return (
    <section onClick={onClickRoom}>
      <div className='chat card'>
        <img className='chat__img' src={setAvatar(avatar)} alt='profile-img' />
        <div className='chat__info'>
          <div className='chat__info__firstLine'>
            <h1 className='chat__name'>{userName}</h1>
            <div className='statusCircle'></div>
          </div>
          <p className='chat__message'>{lastMessageText}</p>
        </div>
        <div className='chat__info right'>
          <p className='chat__date'>{formattedTime}</p>
          {/* <div className='msgCounter'>7</div> */}
        </div>
      </div>
    </section>
  )
}

export default ChatBlock
