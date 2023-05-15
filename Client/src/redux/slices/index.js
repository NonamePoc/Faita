import { combineReducers } from 'redux'

import theme from './theme'
import modal from './modal'
import user from './user'
import friends from './friends'
import chats from './chats'
import message from './message'
import posts from './posts'

const rootReducer = combineReducers({
  theme,
  modal,
  user,
  friends,
  chats,
  message,
  posts,
})

export default rootReducer
