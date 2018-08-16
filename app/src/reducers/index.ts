import { combineReducers } from "redux"
import { forumReducer } from './forum'
import { sessionReducer } from "./session"
import { userReducer } from "./user"

export const rootReducer = combineReducers({
  forumState: forumReducer,
  sessionState: sessionReducer,
  userState: userReducer
});
