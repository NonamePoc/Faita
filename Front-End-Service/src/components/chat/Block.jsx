import React from 'react'
import { Link } from 'react-router-dom'
import { joinRoom } from '../../api/chatRequests'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ChatBlock() {
  const user = useSelector((state) => state.user)
  const { navigate } = useNavigate()

  const handleJoinRoom = () => {
    joinRoom(user.id, 'room1', user.token).then((res) => {
      res.status === 200 && navigate('/chat/1')
    })
  }

  return (
    <>
      <section onClick={handleJoinRoom}>
        <div className='chat card'>
          <img
            className='chat__img'
            src='https://picsum.photos/id/858/200'
            alt='profile-img'
          />
          <div className='chat__info'>
            <div className='chat__info__firstLine'>
              <h1 className='chat__name'>Name</h1>
              <div className='statusCircle'></div>
            </div>
            <p className='chat__message'>
              Hello! fkkkkkkkkkkkdsofkod fffffffffffffffff fffff fffffffff
              fffffffff ffffffff fffff fffffff fesfkkkk kkkdofjkoe....
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
