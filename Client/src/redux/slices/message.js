import { createSlice } from '@reduxjs/toolkit'

const message = createSlice({
  name: 'message',
  initialState: {
    isShown: false,
    isAllowed: true,
    name: '',
    message: '',
    chatId: '',
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
      return { isShown: false, name: '', message: '', chatId: '' }
    },
    setConnect: (state, action) => {
      return {
        ...state,
        connection: action.payload,
      }
    },
    setIsAllowed: (state, action) => {
      return {
        ...state,
        isAllowed: action.payload,
      }
    },
  },
})

export const { setMessage, resetMessage, setConnect } = message.actions

export default message.reducer
