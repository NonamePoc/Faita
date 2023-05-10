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
    toggleDeletePostModal: (state, action) => {
      state.deletePostModalOpen = !state.deletePostModalOpen
      state.deletePostId = action.payload
    },
    toggleAvatarModal: (state) => {
      state.avatarModalOpen = !state.avatarModalOpen
    },
  },
})

export const { toggleFileModal, toggleDeletePostModal, toggleAvatarModal } =
  modal.actions

export default modal.reducer
