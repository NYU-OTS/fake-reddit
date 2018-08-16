const INITIAL_STATE = {
  posts: {},
  users: {}
};

const setPosts = (state: any, action: any) => ({
  ...state,
  posts: action.posts
})

const setUsers = (state: any, action: any) => ({
  ...state,
  users: action.users
})

const setSubforums = (state: any, action: any) => ({
  ...state,
  subforums: action.subforums
})

export function adminReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "ADMIN_SET_USERS": {
      return setUsers(state, action);
    }
    case "ADMIN_SET_POSTS": {
      return setPosts(state, action);
    }
    case "ADMIN_SET_SUBFORUM": {
      return setSubforums(state, action);
    }
    default:
      return state;
  }
}