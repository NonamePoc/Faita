import { combineReducers } from 'redux'

import theme from './theme'
import user from './user'

const rootReducer = combineReducers({
  theme,
  user,
})

export default rootReducer
