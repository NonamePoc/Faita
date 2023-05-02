import { createSlice } from '@reduxjs/toolkit'

const modal = createSlice({
  name: 'modal',
  initialState: {
    fileModalOpen: false,
  },
  reducers: {
    toggleFileModal: (state) => {
      state.fileModalOpen = !state.fileModalOpen
    },
  },
})

export const { toggleFileModal } = modal.actions

export default modal.reducer
