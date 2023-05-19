import { createAsyncThunk } from '@reduxjs/toolkit'
import { getRooms, createRoom, sendMessage } from '../../api/chatRequests'

export const fetchRooms = createAsyncThunk(
  'chats/fetchRooms',
  async (_, { getState }) => {
    const { token } = getState().user
    return await getRooms(token)
  }
)

export const createChatRoom = createAsyncThunk(
  'chats/createChatRoom',
  async ({ roomName, friendId }, { getState }) => {
    const { token } = getState().user
    return await createRoom(roomName, friendId, token)
  }
)

export const sendChatMessage = createAsyncThunk(
  'chats/sendChatMessage',
  async ({ receiverId, text, roomId }, { getState }) => {
    const { token } = getState().user
    return await sendMessage(receiverId, text, roomId, token)
  }
)
