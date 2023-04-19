import { createSlice } from '@reduxjs/toolkit'
import { joinRoom, sendMessage } from '../../api/chatRequests'
import { fetchRooms } from './user'

const chat = createSlice({
  name: 'chat',
  initialState: {
    id: '',
    name: '',
    messages: [],
    users: [],
  },
  reducers: {
    setRoom: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    exitRoom: () => {
      return { ...chat.initialState }
    },
  },
})

export const joinToRoom = (friendId) => async (dispatch, getState) => {
  const { id } = getState().chat
  const { token } = getState().user
  const res = await joinRoom(friendId, id, token)
  if (res.status === 200) {
    dispatch(fetchRooms())
  }
}

export const sendChatMessage =
  (message, receiverId) => async (dispatch, getState) => {
    const { id: roomId } = getState().chat
    const { id: userId, token } = getState().user
    const res = await sendMessage(userId, receiverId, message, roomId, token)
    if (res.status === 200) {
      dispatch(fetchRooms())
    }
  }

export const { setRoom, exitRoom } = chat.actions

export default chat.reducer
