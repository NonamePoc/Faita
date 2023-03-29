import { combineReducers } from 'redux'

import theme from './theme'
import menu from './menu'

const rootReducer = combineReducers({
  theme,
  menu,
})

export default rootReducer
