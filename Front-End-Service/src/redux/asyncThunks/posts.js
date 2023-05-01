import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPostsByUser, createPost } from '../../api/postRequests'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { getState }) => {
    const { token } = getState().user
    return (await getPostsByUser(token)).data.$values
  }
)

export const createNewPost = createAsyncThunk(
  'posts/createNewPost',
  async ({ content, image, video, audio }, { getState }) => {
    const { userName, token } = getState().user
    console.log('userName', getState().user, getState().posts)
    if (!image) image = ''
    if (!video) video = ''
    if (!audio) audio = ''
    return (await createPost(userName, content, image, video, audio, token))
      .data.$values
  }
)
