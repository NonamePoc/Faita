import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getRooms,
  createRoom,
  joinRoom,
  sendMessage,
} from '../../api/chatRequests'

export const fetchRooms = createAsyncThunk(
  'chats/fetchRooms',
  async (_, { getState }) => {
    const { token } = getState().user
    const res = await getRooms(token)
    return res.data.$values
  }
)

export const createChatRoom = createAsyncThunk(
  'chats/createChatRoom',
  async (roomName, { getState }) => {
    const { id, token } = getState().user
    return await createRoom(roomName, id, token)
  }
)

export const joinToRoom = createAsyncThunk(
  'chats/joinToRoom',
  async ({ userId, chatRoomId }, { getState }) => {
    const { token } = getState().user
    return await joinRoom(userId, chatRoomId, token)
  }
)

export const sendChatMessage = createAsyncThunk(
  'chats/sendChatMessage',
  async ({ receiverId, text, roomId }, { getState }) => {
    const { id: userId, token } = getState().user
    return await sendMessage(userId, receiverId, text, roomId, token)
  }
)
