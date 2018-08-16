const INITIAL_STATE = {
  subforums: {}
}

const setSubforums = (state: {}, action: any) => ({
  ...state,
  subforums: action.subforums
})

export function forumReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "FORUM_SET_SUBFORUMS": {
      return setSubforums(state, action)
    }
    default:
      return state;
  }
}