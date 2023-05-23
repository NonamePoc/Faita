import { createSlice } from '@reduxjs/toolkit'
import {
  fetchFriends,
  addToFriends,
  removeFromFriends,
  fetchReceivedRequests,
  fetchSentRequests,
} from '../asyncThunks/friends'

const friends = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    loaded: false,
    receivedRequests: [],
    receivedReqsLoaded: false,
    sentRequests: [],
    sentReqsLoaded: false,
    error: null,
  },
  reducers: {
    resetFriendsError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state) => {
      state.loaded = false
    })
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.friends = action.payload
      state.loaded = true
    })
    builder.addCase(addToFriends.fulfilled, () => {})
    builder.addCase(addToFriends.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(removeFromFriends.fulfilled, () => {})
    builder.addCase(fetchReceivedRequests.pending, (state) => {
      state.receivedReqsLoaded = false
    })
    builder.addCase(fetchReceivedRequests.fulfilled, (state, action) => {
      state.receivedRequests = action.payload
      state.receivedReqsLoaded = true
    })
    builder.addCase(fetchSentRequests.pending, (state) => {
      state.sentReqsLoaded = false
    })
    builder.addCase(fetchSentRequests.fulfilled, (state, action) => {
      state.sentRequests = action.payload
      state.sentReqsLoaded = true
    })
  },
})

export const { resetFriendsError } = friends.actions

export default friends.reducer
