const INITIAL_STATE = {
  theme: localStorage.getItem('theme') || 'light',
}

const theme = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      localStorage.setItem('theme', state.theme === 'light' ? 'dark' : 'light')
      console.log(localStorage.getItem('theme'))
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    default:
      return state
  }
}

export default theme
