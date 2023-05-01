import { createSlice } from '@reduxjs/toolkit'
import {
  fetchRooms,
  createChatRoom,
  joinToRoom,
  sendChatMessage,
} from '../asyncThunks/chats'

const chats = createSlice({
  name: 'chats',
  initialState: {
    rooms: [],
    roomsLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state) => {
      state.roomsLoaded = false
    })
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload
      state.roomsLoaded = true
    })
    builder.addCase(createChatRoom.fulfilled, () => {})
    builder.addCase(joinToRoom.fulfilled, () => {})
    builder.addCase(sendChatMessage.fulfilled, () => {})
  },
})

export default chats.reducer
