import { createSlice } from '@reduxjs/toolkit'
import { changeImage } from '../../api/userRequests'
import {
  login,
  changeFirstName,
  changeLastName,
  changeUserEmail,
  changeUserPassword,
  fetchFriends,
  addToFriends,
  removeFromFriends,
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
    image: '',
    isAuth: false,
    isOnline: navigator.onLine,
    friends: [],
  },
  reducers: {
    resetUserData: () => {
      return { ...user.initialState }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.token = action.payload.token
      state.userName = action.payload.userName
      state.password = action.payload.password
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.patronymic = action.payload.patronymic
      state.image = action.payload.image
      state.friends = action.payload.friends
      state.rooms = action.payload.rooms
      state.isAuth = true
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
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.friends = action.payload
    })
    builder.addCase(addToFriends.fulfilled, () => {})
    builder.addCase(removeFromFriends.fulfilled, () => {})
  },
})

export const changeUserImage = (image) => async (dispatch, getState) => {
  const { token } = getState().user
  const res = await changeImage(image, token)
  if (res.status === 200) {
    alert('New image is set succesfully.')
    dispatch(user.actions.setUserData({ image: image }))
  }
}

/* export const addToFriends = (friendId) => async (dispatch, getState) => {
  const { id, token } = getState().user
  const res = await addFriend(id, friendId, token)
  if (res.status === 200) {
    dispatch(fetchFriends(id))
  }
} */

/* export const removeFromFriends = (friendId) => async (dispatch, getState) => {
  const { id, token } = getState().user
  const res = await removeFriend(id, friendId, token)
  if (res.status === 200) {
    dispatch(fetchFriends(id))
  }
} */

/* export const createChatRoom = (room) => async (dispatch, getState) => {
  const { id, token } = getState().user
  const res = await createRoom(room, id, token)
  if (res.status === 200) {
    dispatch(fetchRooms())
  }
} */

export const { setUserData, resetUserData } = user.actions

export default user.reducer
