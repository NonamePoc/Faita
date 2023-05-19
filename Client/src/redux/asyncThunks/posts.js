import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getPostsByUser,
  getRepostsByUser,
  getRandomPosts,
  getPostById,
  getLikesByPostId,
  getCommentsByPostId,
  getRepostsByPostId,
  postPost,
  postLike,
  postComment,
  postRepost,
  putPost,
  putComment,
  deletePost,
  deleteComment,
} from '../../api/postRequests'

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userName) => {
    return (await getPostsByUser(userName)).data.$values
  }
)

export const fetchUserReposts = createAsyncThunk(
  'posts/fetchUserReposts',
  async (userName, { getState }) => {
    const { token } = getState().user
    return (await getRepostsByUser(userName, token)).data.$values
  }
)

export const fetchRandomPosts = createAsyncThunk(
  'posts/fetchRandomPosts',
  async (count) => {
    return (await getRandomPosts(count)).data.$values
  }
)

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId, { getState }) => {
    const { token } = getState().user
    return (await getPostById(postId, token)).data.result
  }
)

export const getLikes = createAsyncThunk(
  'posts/getLikes',
  async (postId, { getState }) => {
    const { token } = getState().user
    return (await getLikesByPostId(postId, token)).data.$values
  }
)

export const getComments = createAsyncThunk(
  'posts/getComments',
  async (postId, { getState }) => {
    const { token } = getState().user
    return (await getCommentsByPostId(postId, token)).data.$values
  }
)

export const getShares = createAsyncThunk(
  'posts/getShares',
  async (postId, { getState }) => {
    const { token } = getState().user
    return (await getRepostsByPostId(postId, token)).data.$values
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ content, image, video, audio }, { getState }) => {
    const { userName, token } = getState().user
    if (!image) image = ''
    if (!video) video = ''
    if (!audio) audio = ''
    return await postPost(userName, content, image, video, audio, token)
  }
)

export const putLike = createAsyncThunk(
  'posts/putLike',
  async (postId, { getState }) => {
    const { token } = getState().user
    return await postLike(postId, token)
  }
)

export const createComment = createAsyncThunk(
  'posts/createComment',
  async ({ postId, content }, { getState }) => {
    const { token } = getState().user
    return await postComment(postId, content, token)
  }
)

export const sharePost = createAsyncThunk(
  'posts/sharePost',
  async (postId, { getState }) => {
    const { token } = getState().user
    return await postRepost(postId, token)
  }
)

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postId, data }, { getState }) => {
    const { userName, token } = getState().user
    return await putPost(
      postId,
      userName,
      data.content,
      data.imageUrl,
      data.videoUrl,
      data.audioUrl,
      token
    )
  }
)

export const editComment = createAsyncThunk(
  'posts/editComment',
  async ({ commentId, content }, { getState }) => {
    const { token } = getState().user
    return await putComment(commentId, content, token)
  }
)

export const deleteUserPost = createAsyncThunk(
  'posts/deleteUserPost',
  async (postId, { getState }) => {
    const { token } = getState().user
    return await deletePost(postId, token)
  }
)

export const deleteUserComment = createAsyncThunk(
  'posts/deleteComment',
  async (commentId, { getState }) => {
    const { token } = getState().user
    return await deleteComment(commentId, token)
  }
)
