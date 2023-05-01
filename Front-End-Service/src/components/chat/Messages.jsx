import React from 'react'
import { useSelector } from 'react-redux'
import truncateDate from '../../utils/truncateDate'
import useToShow from '../../hooks/useToShow'

function Messages({ room }) {
  const msgContainerRef = React.useRef(null)
  const { itemsToShow, handleScroll } = useToShow(10, msgContainerRef)

  const user = useSelector((state) => state.user)

  const [messages, setMessages] = React.useState([...room.messages.$values])
  let connection = useSelector((state) => state.message.connection)

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
          .slice(-itemsToShow)
          .map((msg, index) =>
            msg.senderId === user.id ? (
              <div key={index} className='msg msg__user'>
                <span className='msg__date'>{truncateDate(msg.createdAt)}</span>
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
                <span className='msg__date'>{truncateDate(msg.createdAt)}</span>
              </div>
            )
          )}
    </div>
  )
}

export default Messages
