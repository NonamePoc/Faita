import { createSlice } from '@reduxjs/toolkit'
import {
  changeUserData,
  changeEmail,
  changePassword,
  logoutUser,
  loginUser,
} from '../../api/userRequests'
import { getFriends, addFriend, removeFriend } from '../../api/friendRequests'
import { getRooms, sendMessage, createRoom } from '../../api/chatRequests'

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
    isOnline: navigator.onLine,
    friends: [],
    rooms: [],
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

export const login = (userData, navigate) => async (dispatch) => {
  const res = await loginUser(userData)
  if (res.status === 200) {
    dispatch(
      setUserData({
        token: res.data.token,
        id: res.data.id,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        patronymic: res.data.patronymic,
        isAuth: true,
      })
    )
    navigate('/')
  }
}

export const changeFirstName = (newName) => async (dispatch, getState) => {
  const { lastName, token } = getState().user
  const res = await changeUserData(newName, lastName, token)
  if (res.status === 200) {
    alert('First name changed successfully!')
    dispatch(user.actions.setUserData({ firstName: newName }))
  }
}

export const changeLastName = (newName) => async (dispatch, getState) => {
  const { firstName, token } = getState().user
  const res = await changeUserData(firstName, newName, token)
  if (res.status === 200) {
    alert('Last name changed successfully!')
    dispatch(user.actions.setUserData({ lastName: newName }))
  }
}

export const changeUserEmail = (newEmail) => async (dispatch, getState) => {
  const { token } = getState().user
  const res = await changeEmail(newEmail, token)
  if (res.status === 200) {
    alert('Please confirm your new email address.')
    dispatch(user.actions.setUserData({ email: newEmail }))
  }
}

export const changeUserPassword = (newPass) => async (dispatch, getState) => {
  const { password, email, token } = getState().user
  const res = await changePassword(password, newPass, email, token)
  if (res.status === 200) {
    alert(
      'Letter was sent on your email that your password was changed succesfuly.'
    )
    dispatch(user.actions.setUserData({ password: newPass }))
  }
}

export const exitUser = () => async (dispatch, getState) => {
  const { token } = getState().user
  const res = await logoutUser(token)
  if (res.status === 200) {
    dispatch(user.actions.resetUserData())
  }
}

export const fetchFriends = (userId) => async (dispatch) => {
  const res = await getFriends(userId)
  if (res.status === 200) {
    dispatch(user.actions.setUserData({ friends: res.data }))
  }
}

export const addToFriends = (friendId) => async (dispatch, getState) => {
  const { id, token } = getState().user
  const res = await addFriend(id, friendId, token)
  if (res.status === 200) {
    dispatch(fetchFriends(id))
  }
}

export const removeFromFriends = (friendId) => async (dispatch, getState) => {
  const { id, token } = getState().user
  const res = await removeFriend(id, friendId, token)
  if (res.status === 200) {
    dispatch(fetchFriends(id))
  }
}

export const fetchRooms = () => async (dispatch, getState) => {
  const { id } = getState().user
  const res = await getRooms(id)
  if (res.status === 200) {
    dispatch(user.actions.setUserData({ rooms: res.data }))
  }
}

//add dispatch later
export const sendChatMessage =
  (message, receiverId, roomId) => async (getState) => {
    const { id, token } = getState().user
    await sendMessage(id, receiverId, message, roomId, token)
  }

export const createChatRoom = (room) => async (dispatch, getState) => {
  const { id, token } = getState().user
  const res = await createRoom(id, room, token)
  if (res.status === 200) {
    dispatch(fetchRooms())
    console.log(res)
  }
}

export const { setUserData, resetUserData } = user.actions

export default user.reducer
