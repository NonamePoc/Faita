import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getPostsByUser,
  getRepostsByUser,
  getPostsById,
  getLikesByPostId,
  getCommentsByPostId,
  getRepostsByPostId,
  createPost,
  addLike,
  repost,
  deletePost,
  removeLike,
  addComment,
} from '../../api/postRequests'

export const fetchPosts = createAsyncThunk(
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

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId, { getState }) => {
    const { token } = getState().user
    return (await getPostsById(postId, token)).data.result
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

export const createNewPost = createAsyncThunk(
  'posts/createNewPost',
  async ({ content, image, video, audio }, { getState }) => {
    const { userName, token } = getState().user
    if (!image) image = ''
    if (!video) video = ''
    if (!audio) audio = ''
    return await createPost(userName, content, image, video, audio, token)
  }
)

export const createComment = createAsyncThunk(
  'posts/createComment',
  async ({ postId, content }, { getState }) => {
    const { token } = getState().user
    return await addComment(postId, content, token)
  }
)

export const putLike = createAsyncThunk(
  'posts/putLike',
  async (postId, { getState }) => {
    const { token } = getState().user
    return await addLike(postId, token)
  }
)

export const sharePost = createAsyncThunk(
  'posts/sharePost',
  async (postId, { getState }) => {
    const { token } = getState().user
    return await repost(postId, token)
  }
)

export const cancelLike = createAsyncThunk(
  'posts/cancelLike',
  async (likeId, { getState }) => {
    const { token } = getState().user
    return await removeLike(likeId, token)
  }
)

export const deleteUserPost = createAsyncThunk(
  'posts/deleteUserPost',
  async (postId, { getState }) => {
    const { token } = getState().user
    return await deletePost(postId, token)
  }
)
