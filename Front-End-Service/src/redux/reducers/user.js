import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    patronymic: '',
    userName: '',
    password: '',
    email: '',
  },
  reducers: {
    setUserData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setUserData } = user.actions

export default user.reducer
