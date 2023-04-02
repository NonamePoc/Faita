import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    id: '',
    token: '',
    firstName: '',
    lastName: '',
    patronymic: '',
    userName: '',
    password: '',
    email: '',
    friends: [],
  },
  reducers: {
    setUserData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    resetUserData: (state) => {
      return this.initialState
    },
  },
})

export const { setUserData, resetUserData } = user.actions

export default user.reducer
