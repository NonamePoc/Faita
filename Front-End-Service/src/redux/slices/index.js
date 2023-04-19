import { combineReducers } from 'redux'

import theme from './theme'
import user from './user'
import chat from './chat'

const rootReducer = combineReducers({
  theme,
  user,
  chat,
})

export default rootReducer
