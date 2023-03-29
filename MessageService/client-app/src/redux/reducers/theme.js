import { createSlice } from '@reduxjs/toolkit'

const theme = createSlice({
  name: 'theme',
  initialState: {
    theme: localStorage.getItem('theme') || 'light',
  },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      state.theme = newTheme
    },
  },
})

export const { toggleTheme } = theme.actions

export default theme.reducer
