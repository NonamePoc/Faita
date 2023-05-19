import { createSlice } from '@reduxjs/toolkit'
import {
  createNewPost,
  deleteUserPost,
  fetchPostById,
  fetchRandomPosts,
  fetchPosts,
  fetchUserReposts,
  getComments,
  getLikes,
  getShares,
} from '../asyncThunks/posts'

const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loadedPosts: false,
    userPosts: [],
    loaded: false,
    userReposts: [],
    repostsLoaded: false,
    commentsLoaded: false,
    likesLoaded: false,
    sharesLoaded: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.userPosts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loaded = false
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload
      state.loaded = true
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(fetchUserReposts.pending, (state) => {
      state.repostsLoaded = false
    })
    builder.addCase(fetchUserReposts.fulfilled, (state, action) => {
      state.userReposts = action.payload
      state.repostsLoaded = true
    })
    builder.addCase(fetchUserReposts.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(createNewPost.fulfilled, () => {})
    builder.addCase(createNewPost.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(fetchPostById.fulfilled, () => {})
    builder.addCase(deleteUserPost.fulfilled, () => {})
    builder.addCase(deleteUserPost.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(getComments.pending, (state) => {
      state.commentsLoaded = false
    })
    builder.addCase(getComments.fulfilled, (state) => {
      state.commentsLoaded = true
    })
    builder.addCase(getLikes.pending, (state) => {
      state.likesLoaded = false
    })
    builder.addCase(getLikes.fulfilled, (state) => {
      state.likesLoaded = true
    })
    builder.addCase(getShares.pending, (state) => {
      state.sharesLoaded = false
    })
    builder.addCase(getShares.fulfilled, (state) => {
      state.sharesLoaded = true
    })
    builder.addCase(fetchRandomPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.loadedPosts = true
    })
    builder.addCase(fetchRandomPosts.pending, (state) => {
      state.loadedPosts = false
    })
  },
})

export const { setPosts } = posts.actions

export default posts.reducer
