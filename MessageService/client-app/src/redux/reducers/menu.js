import { createSlice } from '@reduxjs/toolkit'

const menu = createSlice({
  name: 'menu',
  initialState: {
    activeItem: 0,
  },
  reducers: {
    setMenu: (state, action) => {
      state.activeItem = action.payload
    },
  },
})

export const { setMenu } = menu.actions

export default menu.reducer
