import { createSlice } from '@reduxjs/toolkit'

const modal = createSlice({
  name: 'modal',
  initialState: {
    fileModalOpen: false,
    avatarModalOpen: false,
    deletePostModalOpen: false,
    deletePostId: null,
    editPostModalOpen: false,
    editPost: null,
    deleteCommentModalOpen: false,
    deleteCommentId: null,
    editCommentModalOpen: false,
    editComment: null,
  },
  reducers: {
    toggleFileModal: (state) => {
      state.fileModalOpen = !state.fileModalOpen
    },
    toggleAvatarModal: (state) => {
      state.avatarModalOpen = !state.avatarModalOpen
    },
    openDeletePostModal: (state, action) => {
      state.deletePostModalOpen = true
      state.deletePostId = action.payload
    },
    closeDeletePostModal: (state) => {
      state.deletePostModalOpen = false
    },
    openEditPostModal: (state, action) => {
      state.editPostModalOpen = true
      state.editPost = action.payload
    },
    closeEditPostModal: (state) => {
      state.editPostModalOpen = false
    },
    openDeleteCommentModal: (state, action) => {
      state.deleteCommentModalOpen = true
      state.deleteCommentId = action.payload
    },
    closeDeleteCommentModal: (state) => {
      state.deleteCommentModalOpen = false
    },
    openEditCommentModal: (state, action) => {
      state.editCommentModalOpen = true
      state.editComment = action.payload
    },
    closeEditCommentModal: (state) => {
      state.editCommentModalOpen = false
    },
  },
})

export const {
  toggleFileModal,
  toggleAvatarModal,
  openDeletePostModal,
  closeDeletePostModal,
  openEditPostModal,
  closeEditPostModal,
  openDeleteCommentModal,
  closeDeleteCommentModal,
  openEditCommentModal,
  closeEditCommentModal,
} = modal.actions

export default modal.reducer
