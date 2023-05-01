import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  loginUser,
  changeUserData,
  changeEmail,
  changePassword,
} from '../../api/userRequests'

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
