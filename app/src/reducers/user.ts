const INITIAL_STATE = {
  currentUser: {
    email: '',
    messages: [],
    password: '', // lol
    posts: [],
    uid: '',
    username: '',
  },
};

export function userReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "USERS_POST": {
      if (state.currentUser) {
        if (state.currentUser.uid) {
          return true;
        }
      }
      return false;
    }
    default:
      return state;
  }
}