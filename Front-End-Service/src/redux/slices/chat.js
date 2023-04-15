import { createSlice } from '@reduxjs/toolkit'
import * as signalR from '@microsoft/signalr'

const chat = createSlice({
  name: 'chat',
  initialState: {
    connection: new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7206/chatHub')
      .build(),
  },
})

export default chat.reducer
