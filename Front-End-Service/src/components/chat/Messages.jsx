import React from 'react'
import * as signalR from '@microsoft/signalr'
import { useSelector } from 'react-redux'

function Messages() {
  const msgContainerRef = React.useRef(null)
  const user = useSelector((state) => state.user)
  const room = useSelector((state) => state.chat)
  const [messagesToShow, setMessagesToShow] = React.useState(20)
  const [messages, setMessages] = React.useState([...room.messages])
  const [scrollPosition, setScrollPosition] = React.useState(0)

  let connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7206/chatHub')
    .build()

  const changeCreateAt = (createdAt) => {
    const now = new Date()
    const date = new Date(createdAt)
    if (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    ) {
      if (date.getDate() === now.getDate()) {
        return date.getHours() + ':' + date.getMinutes()
      } else {
        return date.getMonth() + '/' + date.getDate()
      }
    } else {
      return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()
    }
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight } = msgContainerRef.current
    if (scrollTop === 0) {
      setScrollPosition(scrollHeight)
      setMessagesToShow((prev) => prev + 20)
    }
  }

  React.useEffect(() => {
    if (scrollPosition === 0) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight
    } else {
      msgContainerRef.current.scrollTop =
        msgContainerRef.current.scrollHeight - scrollPosition
    }
  }, [messagesToShow, scrollPosition])

  React.useEffect(() => {
    msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight
  }, [messages])

  React.useEffect(() => {
    connection.on('ReceiveMessage', (senderId, text, chatRoomId) => {
      setMessages((messages) => [
        ...messages,
        { senderId, text, chatRoomId, createdAt: new Date() },
      ])
    })
    connection.start()
    return () => connection.off('ReceiveMessage')
  }, [connection])

  return (
    <div
      ref={msgContainerRef}
      className='chat__msgs__cont'
      onScroll={handleScroll}
    >
      {messages.length > 0 &&
        messages
          .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
          .slice(-messagesToShow)
          .map((msg, index) =>
            msg.senderId === user.id ? (
              <div key={index} className='msg msg__user'>
                <span className='msg__date'>
                  {changeCreateAt(msg.createdAt)}
                </span>
                {msg.text.includes('https://media.tenor.com') ? (
                  <img className='msg__text' src={msg.text} alt='gif' />
                ) : (
                  <p className='msg__text'>{msg.text}</p>
                )}
              </div>
            ) : (
              <div key={index} className='msg msg__stranger'>
                <img
                  className='msg__stranger__img'
                  src='https://picsum.photos/id/235/800'
                  alt='profile-img'
                />
                <p className='msg__text'>{msg.text}</p>
                <span className='msg__date'>
                  {changeCreateAt(msg.createdAt)}
                </span>
              </div>
            )
          )}
    </div>
  )
}

export default Messages
