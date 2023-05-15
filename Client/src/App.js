import React from 'react'
import Router from './router'
import { HubConnectionState } from '@microsoft/signalr'
import connection from './utils/connection'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, setConnect } from './redux/slices/message'
import { SkeletonTheme } from 'react-loading-skeleton'
import truncateText from './utils/truncateText'

function App() {
  const { theme } = useSelector((state) => state.theme)
  const { rooms } = useSelector((state) => state.chats)
  const { id: userId } = useSelector((state) => state.user)
  const dispatch = useDispatch()

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
            message: truncateText(text, 20),
            chatId: chatRoomId,
          })
        )
    })
    connection.state === HubConnectionState.Disconnected && connection.start()

    return () => connection.off('ReceiveMessage')
  }, [dispatch, rooms, userId])

  return (
    <div className={theme}>
      <SkeletonTheme
        baseColor={theme === 'dark' ? '#202020' : '#ebebeb'}
        highlightColor={theme === 'dark' ? '#292929' : '#f5f5f5'}
      >
        <Router />
      </SkeletonTheme>
    </div>
  )
}

export default App
