import { combineReducers } from 'redux'

import theme from './theme'
import user from './user'
import chat from './chat'
import message from './message'

const rootReducer = combineReducers({
  theme,
  user,
  chat,
  message,
})

export default rootReducer
