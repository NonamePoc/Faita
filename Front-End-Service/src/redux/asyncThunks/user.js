import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  loginUser,
  changeUserData,
  changeEmail,
  changePassword,
} from '../../api/userRequests'
import { getFriends, addFriend, removeFriend } from '../../api/friendRequests'

export const login = createAsyncThunk('user/login', async (userData) => {
  const res = (await loginUser(userData)).data
  res.userName = userData.userName
  res.password = userData.password
  return res
})

export const changeFirstName = createAsyncThunk(
  'user/changeFirstName',
  async (newName, { getState }) => {
    const { lastName, token } = getState().user
    await changeUserData(newName, lastName, token)
    return newName
  }
)

export const changeLastName = createAsyncThunk(
  'user/changeLastName',
  async (newName, { getState }) => {
    const { firstName, token } = getState().user
    await changeUserData(firstName, newName, token)
    return newName
  }
)

export const changeUserEmail = createAsyncThunk(
  'user/changeUserEmail',
  async (newEmail, { getState }) => {
    const { token } = getState().user
    await changeEmail(newEmail, token)
    return newEmail
  }
)

export const changeUserPassword = createAsyncThunk(
  'user/changeUserPassword',
  async (newPass, { getState }) => {
    const { password, email, token } = getState().user
    await changePassword(password, newPass, email, token)
    return newPass
  }
)

export const fetchFriends = createAsyncThunk(
  'user/fetchFriends',
  async (userId, { getState }) => {
    const { id } = getState().user
    const res = await getFriends(userId)
    return res.data.$values.filter((friend) => friend.id !== id)
  }
)

export const addToFriends = createAsyncThunk(
  'user/addToFriends',
  async (friendId, { getState }) => {
    const { id, token } = getState().user
    return (await addFriend(id, friendId, token)).data
  }
)

export const removeFromFriends = createAsyncThunk(
  'user/removeFromFriends',
  async (userFriendId, { getState }) => {
    const { id, token } = getState().user
    return (await removeFriend(id, userFriendId, token)).data
  }
)
