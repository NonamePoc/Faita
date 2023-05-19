import React from 'react'
import { useSelector } from 'react-redux'
import useToShow from '../../hooks/useToShow'
import truncateDate from '../../utils/truncateDate'
import { IsGif } from '../../utils/checkGif'

const Messages = React.memo(({ room }) => {
  const user = useSelector((state) => state.user)
  let connection = useSelector((state) => state.message.connection)
  const [messages, setMessages] = React.useState([...room.messages.$values])
  const msgContainerRef = React.useRef(null)
  const { itemsToShow, handleScroll } = useToShow(10, msgContainerRef)

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

  const IsCurrentUser = (senderId) => senderId === user.id

  return (
    <div className='chat__msgs__wrapper'>
      <div
        ref={msgContainerRef}
        className='chat__msgs__cont'
        onScroll={handleScroll}
      >
        {messages.length > 0 &&
          messages
            .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
            .slice(-itemsToShow)
            .map(({ senderId, text, createdAt }, index) => (
              <div
                key={index}
                className={`msg msg__${
                  IsCurrentUser(senderId) ? 'user' : 'stranger'
                }`}
              >
                {!IsCurrentUser(senderId) && (
                  <img
                    className='msg__stranger__img'
                    src='https://picsum.photos/id/235/800'
                    alt='profile-img'
                  />
                )}
                {IsGif(text) ? (
                  <img className='msg__text' src={text} alt='gif' />
                ) : (
                  <p className='msg__text'>{text}</p>
                )}
                <span className='msg__date'>{truncateDate(createdAt)}</span>
              </div>
            ))}
      </div>
    </div>
  )
})

export default Messages
