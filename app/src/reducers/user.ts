const INITIAL_STATE = {
  authUser: null,
  currentUser: null,
  posts: {},
}

const setAuthUser = (state: any, action: any) => ({
  ...state,
  authUser: action.authUser
});

const setPosts = (state: {}, action: any) => ({
  ...state,
  posts: action.posts,
})

const setCurrentUser = (state: {}, action: any) => ({
  ...state,
  currentUser: action.currentUser
})

export function userReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "USER_SET_CURRENT_USER": {
      return setCurrentUser(state, action)
    }
    case "USER_SET_POST": {
      return setPosts(state, action)
    }
    case "USER_SET_AUTH_USER": {
      return setAuthUser(state, action)
    }
    default:
      return state;
  }
}