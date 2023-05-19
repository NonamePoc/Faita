import { createSlice } from '@reduxjs/toolkit'
import { fetchRooms } from '../asyncThunks/chats'

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
      state.rooms = action.payload.data.$values
      state.roomsLoaded = true
    })
  },
})

export default chats.reducer
