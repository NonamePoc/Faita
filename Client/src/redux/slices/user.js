import { createSlice } from '@reduxjs/toolkit'
import {
  getUserData,
  register,
  login,
  changeFirstName,
  changeLastName,
  changeUserEmail,
  changeUserPassword,
  changeProfileImage,
} from '../asyncThunks/user'

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
    avatar: '',
    isAuth: false,
    isOnline: navigator.onLine,
    userLoaded: false,
    error: null,
  },
  reducers: {
    resetUserData: () => {
      return { ...user.initialState }
    },
    resetUserError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.userLoaded = false
    })
    builder.addCase(getUserData.fulfilled, (state) => {
      state.userLoaded = true
    })
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.token = action.payload.token
      state.userName = action.payload.userName
      state.password = action.payload.password
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.patronymic = action.payload.patronymic
      state.avatar = action.payload.avatars
      state.friends = action.payload.friends
      state.rooms = action.payload.rooms
      state.isAuth = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(changeFirstName.fulfilled, (state, action) => {
      alert('First name changed successfully!')
      state.firstName = action.payload
    })
    builder.addCase(changeLastName.fulfilled, (state, action) => {
      alert('Last name changed successfully!')
      state.lastName = action.payload
    })
    builder.addCase(changeUserEmail.fulfilled, (state, action) => {
      alert('Please confirm your new email address.')
      state.email = action.payload
    })
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      alert('Letter was sent on your email. Please confirm your new password.')
      state.password = action.payload
    })
    builder.addCase(changeProfileImage.fulfilled, (state, action) => {
      alert('Profile image changed successfully!')
      state.avatar = action.payload
    })
  },
})

export const { resetUserData, resetUserError } = user.actions

export default user.reducer
