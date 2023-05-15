import { createSlice } from '@reduxjs/toolkit'

const modal = createSlice({
  name: 'modal',
  initialState: {
    fileModalOpen: false,
    avatarModalOpen: false,
    deletePostModalOpen: false,
    deletePostId: null,
  },
  reducers: {
    toggleFileModal: (state) => {
      state.fileModalOpen = !state.fileModalOpen
    },
    openDeletePostModal: (state, action) => {
      state.deletePostModalOpen = true
      state.deletePostId = action.payload
    },
    closeDeletePostModal: (state) => {
      state.deletePostModalOpen = false
    },
    toggleAvatarModal: (state) => {
      state.avatarModalOpen = !state.avatarModalOpen
    },
  },
})

export const {
  toggleFileModal,
  openDeletePostModal,
  closeDeletePostModal,
  toggleAvatarModal,
} = modal.actions

export default modal.reducer
