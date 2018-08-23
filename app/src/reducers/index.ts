import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { adminReducer } from './admin'
import { forumReducer } from './forum'
import { messageReducer } from './message'
import { postReducer } from './post'
import { subforumReducer } from './subforum'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  subforumState: subforumReducer,
  userState: userReducer,
  forumState: forumReducer,
  postState: postReducer,
  adminState: adminReducer,
  messageState: messageReducer,

  // special treatment (form-redux)
  form: formReducer
})