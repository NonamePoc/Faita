import { createSlice } from '@reduxjs/toolkit'
import { createNewPost, fetchPosts } from '../asyncThunks/posts'

const posts = createSlice({
  name: 'posts',
  initialState: {
    userPosts: [],
    loaded: false,
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
    builder.addCase(createNewPost.fulfilled, () => {})
    builder.addCase(createNewPost.rejected, (state, action) => {
      state.error = action.error.message
    })
  },
})

export const { setPosts } = posts.actions

export default posts.reducer
