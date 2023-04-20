import React from 'react'
import { useSelector } from 'react-redux'

function Messages() {
  const [messagesToShow, setMessagesToShow] = React.useState(20)
  const [scrollPosition, setScrollPosition] = React.useState(0)
  const msgContainerRef = React.useRef(null)
  const user = useSelector((state) => state.user)
  const room = useSelector((state) => state.chat)
  const [messages, setMessages] = React.useState([...room.messages])
  let connection = useSelector((state) => state.message.connection)

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
    if (connection) {
      connection.on('ReceiveMessage', (senderId, text, chatRoomId) => {
        setMessages((messages) => [
          ...messages,
          { senderId, text, chatRoomId, createdAt: new Date() },
        ])
      })

      return () => connection.off('ReceiveMessage')
    }
  })

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
                {msg.text.includes('https://media.tenor.com') ? (
                  <img className='msg__text' src={msg.text} alt='gif' />
                ) : (
                  <p className='msg__text'>{msg.text}</p>
                )}
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
