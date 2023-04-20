import { createSlice } from '@reduxjs/toolkit'

const theme = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light',
  },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      state.theme = newTheme
    },
  },
})

export const { toggleTheme } = theme.actions

export default theme.reducer
