const INITIAL_STATE = {
  mods: {},
  users: {},
  posts: {},
  subforum: null,
  subscribed: false
}

const setModerators = (state: {}, action: any) => ({
  ...state,
  mods: action.mods
})

const setUsers = (state: {}, action: any) => ({
  ...state,
  users: action.users
})

const setPosts = (state: {}, action: any) => ({
  ...state,
  posts: action.posts
})

const setSubforum = (state: {}, action: any) => ({
  ...state,
  subforum: action.subforum
})

const setSubscribed = (state: {}, action: any) => ({
  ...state,
  subscribed: action.subscribed
})

export function subforumReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "SUBFORUM_SET_USERS": {
      return setUsers(state, action)
    }
    case "SUBFORUM_SET_POSTS": {
      return setPosts(state, action)
    }
    case "SUBFORUM_SET_MODS": {
      return setModerators(state, action)
    }
    case "SUBFORUM_SET_SUBFORUM": {
      return setSubforum(state, action)
    }
    case "SUBFORUM_SET_SUBSCRIBED": {
      return setSubscribed(state, action)
    }
    default:
      return state;
  }
}