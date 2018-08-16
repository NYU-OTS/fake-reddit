const INITIAL_STATE = {
  users: {}
};

const setUsers = (state: any, action: any) => ({
  ...state,
  users: action.users
})

export function forumReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "USERS_SET": {
      return setUsers(state, action);
    }
    default:
      return state;
  }
}