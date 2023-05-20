import React from 'react'
import { HubConnectionState } from '@microsoft/signalr'
import { useSelector, useDispatch } from 'react-redux'
import { resetMessage, setConnect, setMessage } from '../redux/slices/message'
import connection from '../utils/connection'
import truncateText from '../utils/truncateText'

function NewMessageAlert() {
  const [isOpen, setIsOpen] = React.useState(false)
  const newMsg = useSelector((state) => state.message)
  const { rooms } = useSelector((state) => state.chats)
  const { id: userId } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (newMsg.isShown) {
      setIsOpen(true)
      setTimeout(() => {
        dispatch(resetMessage())
        setIsOpen(false)
      }, 4000)
    }
  }, [dispatch, newMsg])

  React.useEffect(() => {
    dispatch(setConnect(connection))
  }, [dispatch])

  React.useEffect(() => {
    connection.on('ReceiveMessage', (senderId, text, chatRoomId) => {
      const currentRoom = rooms.find((room) => room.chatId === chatRoomId)
      const otherUser = currentRoom.users.$values.find(
        (user) => user.userId === senderId
      )
      userId !== senderId &&
        dispatch(
          setMessage({
            isShown: true,
            name: otherUser.userName,
            message: truncateText(text, 35),
            chatId: chatRoomId,
          })
        )
    })
    connection.state === HubConnectionState.Disconnected && connection.start()

    return () => connection.off('ReceiveMessage')
  }, [dispatch, rooms, userId])

  return (
    <figure className={`newMsgAlert ${isOpen ? 'active' : ''}`}>
      <figcaption>
        <h1 className='newMsgAlert__name'>{newMsg.name}</h1>
        <p className='newMsgAlert__text'>{newMsg.message}</p>
      </figcaption>
    </figure>
  )
}

export default NewMessageAlert
