import { createSlice } from '@reduxjs/toolkit'
import {
  fetchUserPosts,
  fetchUserReposts,
  fetchRandomPosts,
  getLikes,
  getComments,
  getShares,
} from '../asyncThunks/posts'

const posts = createSlice({
  name: 'posts',
  initialState: {
    userPosts: [],
    loaded: false,
    userReposts: [],
    repostsLoaded: false,
    posts: [],
    loadedPosts: false,
    likesLoaded: false,
    commentsLoaded: false,
    sharesLoaded: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.userPosts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.loaded = false
    })
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload
      state.loaded = true
    })
    builder.addCase(fetchUserReposts.pending, (state) => {
      state.repostsLoaded = false
    })
    builder.addCase(fetchUserReposts.fulfilled, (state, action) => {
      state.userReposts = action.payload
      state.repostsLoaded = true
    })
    builder.addCase(fetchRandomPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.loadedPosts = true
    })
    builder.addCase(fetchRandomPosts.pending, (state) => {
      state.loadedPosts = false
    })
    builder.addCase(getLikes.pending, (state) => {
      state.likesLoaded = false
    })
    builder.addCase(getLikes.fulfilled, (state) => {
      state.likesLoaded = true
    })
    builder.addCase(getComments.pending, (state) => {
      state.commentsLoaded = false
    })
    builder.addCase(getComments.fulfilled, (state) => {
      state.commentsLoaded = true
    })
    builder.addCase(getShares.pending, (state) => {
      state.sharesLoaded = false
    })
    builder.addCase(getShares.fulfilled, (state) => {
      state.sharesLoaded = true
    })
  },
})

export const { setPosts } = posts.actions

export default posts.reducer
