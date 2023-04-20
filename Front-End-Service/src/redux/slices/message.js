import { createSlice } from '@reduxjs/toolkit'

const message = createSlice({
  name: 'message',
  initialState: {
    isShown: false,
    name: '',
    message: '',
    chatId: '',
    image: '',
    connection: null,
  },
  reducers: {
    setMessage: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    resetMessage: () => {
      return { isShown: false, name: '', message: '', chatId: '', image: '' }
    },
    setConnect: (state, action) => {
      return {
        ...state,
        connection: action.payload,
      }
    },
  },
})

export const { setMessage, resetMessage, setConnect } = message.actions

export default message.reducer
