import React from 'react'
import Router from './router'
import { HubConnectionState } from '@microsoft/signalr'
import connection from './utils/connection'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, setConnect } from './redux/slices/message'

function App() {
  const { theme } = useSelector((state) => state.theme)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setConnect(connection))
  }, [dispatch])

  React.useEffect(() => {
    connection.on('ReceiveMessage', (senderId, text, chatRoomId) => {
      const currentRoom = user.rooms.find((r) => r.id === chatRoomId)
      const otherUser = currentRoom.users.find((u) => u.id === senderId)
      if (senderId !== user.id) {
        dispatch(
          setMessage({
            isShown: true,
            name: otherUser.userName,
            message: text,
            chatId: chatRoomId,
          })
        )
      }
    })
    connection.state === HubConnectionState.Disconnected && connection.start()

    return () => connection.off('ReceiveMessage')
  }, [dispatch, user])

  return (
    <div className={theme}>
      <Router />
    </div>
  )
}

export default App
