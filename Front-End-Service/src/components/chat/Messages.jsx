import React from 'react'
import * as signalR from '@microsoft/signalr'
import { useSelector } from 'react-redux'

function Messages() {
  const msgContainerRef = React.useRef(null)
  const user = useSelector((state) => state.user)
  /* const fetchedMessages = useSelector((state) => state.chat.messages) */
  const [messages, setMessages] = React.useState({})

  let connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7206/chatHub')
    /* .configureLogging(signalR.LogLevel.Information) */
    .build()

  React.useEffect(() => {
    msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight
  }, [])

  React.useEffect(() => {
    connection.on('ReceiveMessage', (user, receiver, message, date) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        user,
        receiver,
        message,
        date,
      }))
      console.log('MESSAGES', messages)
    })
    connection.start()
  }, [connection, messages])

  return (
    <div ref={msgContainerRef} className='chat__msgs__cont'>
      <div className='msg msg__stranger'>
        <img
          className='msg__stranger__img'
          src='https://picsum.photos/id/235/800'
          alt='profile-img'
        />
        <p className='msg__text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <span className='msg__date'>13:30</span>
      </div>
      <div className='msg msg__user'>
        <span className='msg__date'>13:32</span>
        <p className='msg__text'>
          Nunc nunc neque, aliquet consequat dolor sed, sollicitudin mollis
          risus
        </p>
      </div>

      <div className='msg msg__stranger'>
        <img
          className='msg__stranger__img'
          src='https://picsum.photos/id/235/800'
          alt='profile-img'
        />
        <p className='msg__text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <span className='msg__date'>13:30</span>
      </div>
      <div className='msg msg__user'>
        <span className='msg__date'>13:32</span>
        <p className='msg__text'>
          Nunc nunc neque, aliquet consequat dolor sed, sollicitudin mollis
          risus
        </p>
      </div>
      <div className='msg msg__stranger'>
        <img
          className='msg__stranger__img'
          src='https://picsum.photos/id/235/800'
          alt='profile-img'
        />
        <p className='msg__text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <span className='msg__date'>13:30</span>
      </div>
      <div className='msg msg__user'>
        <span className='msg__date'>13:32</span>
        <p className='msg__text'>
          Nunc nunc neque, aliquet consequat dolor sed, sollicitudin mollis
          risus
        </p>
      </div>
      <div className='msg msg__stranger'>
        <img
          className='msg__stranger__img'
          src='https://picsum.photos/id/235/800'
          alt='profile-img'
        />
        <p className='msg__text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <span className='msg__date'>13:30</span>
      </div>
      <div className='msg msg__user'>
        <span className='msg__date'>13:32</span>
        <p className='msg__text'>
          Nunc nunc neque, aliquet consequat dolor sed, sollicitudin mollis
          risus
        </p>
      </div>
      <div className='msg msg__stranger'>
        <img
          className='msg__stranger__img'
          src='https://picsum.photos/id/235/800'
          alt='profile-img'
        />
        <p className='msg__text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <span className='msg__date'>13:30</span>
      </div>
      <div className='msg msg__user'>
        <span className='msg__date'>13:32</span>
        <p className='msg__text'>
          Nunc nunc neque, aliquet consequat dolor sed, sollicitudin mollis
          risus
        </p>
      </div>
      <div className='msg msg__stranger'>
        <img
          className='msg__stranger__img'
          src='https://picsum.photos/id/235/800'
          alt='profile-img'
        />
        <p className='msg__text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <span className='msg__date'>13:30</span>
      </div>
      <div className='msg msg__user'>
        <span className='msg__date'>13:32</span>
        <p className='msg__text'>
          Nunc nunc neque, aliquet consequat dolor sed, sollicitudin mollis
          risus
        </p>
      </div>
    </div>
  )
}

export default Messages
