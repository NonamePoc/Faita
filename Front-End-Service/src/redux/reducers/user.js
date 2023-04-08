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
    isAuth: false,
    friends: [],
  },
  reducers: {
    setUserData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    resetUserData: () => {
      return { ...user.initialState }
    },
  },
})

export const { setUserData, resetUserData } = user.actions

export default user.reducer
