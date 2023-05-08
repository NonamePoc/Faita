import { createSlice } from '@reduxjs/toolkit'

const modal = createSlice({
  name: 'modal',
  initialState: {
    fileModalOpen: false,
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
  },
})

export const { toggleFileModal, toggleDeletePostModal } = modal.actions

export default modal.reducer
