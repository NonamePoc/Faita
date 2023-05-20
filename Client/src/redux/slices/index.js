import { combineReducers } from 'redux'

import user from './user'
import friends from './friends'
import chats from './chats'
import posts from './posts'
import theme from './theme'
import modal from './modal'
import message from './message'

const rootReducer = combineReducers({
  user,
  friends,
  chats,
  posts,
  theme,
  modal,
  message,
})

export default rootReducer
