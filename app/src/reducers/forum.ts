const INITIAL_STATE = {
  subforums: null,
  users: null
}

const setSubforums = (state: {}, action: any) => ({
  ...state,
  subforums: action.subforums
})

const setUsers = (state: {}, action: any) => ({
  ...state,
  users: action.users
})

export function forumReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "FORUM_SET_SUBFORUMS": {
      return setSubforums(state, action)
    }
    case "FORUM_SET_USERS": {
      return setUsers(state, action)
    }
    default:
      return state;
  }
}