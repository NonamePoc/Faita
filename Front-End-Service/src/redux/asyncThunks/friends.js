import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getFriends,
  addFriend,
  removeFriend,
  getReceivedRequests,
  getSentRequests,
  confirmFriendRequest,
} from '../../api/friendRequests'

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (_, { getState }) => {
    const { token } = getState().user
    const res = await getFriends(token)
    return res.data.$values
  }
)

export const fetchReceivedRequests = createAsyncThunk(
  'friends/fetchReceivedRequests',
  async (_, { getState }) => {
    const { token } = getState().user
    const res = await getReceivedRequests(token)
    return res.data.$values
  }
)

export const fetchSentRequests = createAsyncThunk(
  'friends/fetchSentRequests',
  async (_, { getState }) => {
    const { token } = getState().user
    const res = await getSentRequests(token)
    return res.data.$values
  }
)

export const addToFriends = createAsyncThunk(
  'friends/addToFriends',
  async (friendId, { getState }) => {
    const { token } = getState().user
    return (await addFriend(friendId, token)).data
  }
)

export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptFriendRequest',
  async (friendId, { getState }) => {
    const { token } = getState().user
    return (await confirmFriendRequest(friendId, token)).data
  }
)

export const removeFromFriends = createAsyncThunk(
  'friends/removeFromFriends',
  async (userFriendId, { getState }) => {
    const { token } = getState().user
    return (await removeFriend(userFriendId, token)).data
  }
)

export const declineRequest = createAsyncThunk(
  'friends/declineRequest',
  async (userFriendId, { getState }) => {
    const { token } = getState().user
    return (await removeFriend(userFriendId, token)).data
  }
)

export const cancelRequest = createAsyncThunk(
  'friends/cancelRequest',
  async (userFriendId, { getState }) => {
    const { token } = getState().user
    return (await removeFriend(userFriendId, token)).data
  }
)
