import { combineReducers } from 'redux'

import theme from './theme'
import user from './user'
import chats from './chats'
import message from './message'
import posts from './posts'

const rootReducer = combineReducers({
  theme,
  user,
  chats,
  message,
  posts,
})

export default rootReducer
