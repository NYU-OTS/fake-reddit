import { combineReducers } from 'redux'
import { adminReducer } from './admin'
import { forumReducer } from './forum'
import { messageReducer } from './message'
import { postReducer } from './post'
import { subforumReducer } from './subforum'
import { userReducer } from "./user"

export const rootReducer = combineReducers({
  subforumState: subforumReducer,
  userState: userReducer,
  forumState: forumReducer,
  postState: postReducer,
  adminState: adminReducer,
  messageState: messageReducer
})