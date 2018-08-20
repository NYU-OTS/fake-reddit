const INITIAL_STATE = {
  authUser: null,
  currentUser: null,
  recipient: null
}

const setAuthUser = (state: any, action: any) => ({
  ...state,
  authUser: action.authUser
});

const setRecipient = (state: any, action: any) => ({
  ...state,
  recipient: action.recipient
});

const setCurrentUser = (state: {}, action: any) => ({
  ...state,
  currentUser: action.currentUser
})

export function userReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "USER_SET_CURRENT_USER": {
      return setCurrentUser(state, action)
    }
    case "USER_SET_AUTH_USER": {
      return setAuthUser(state, action)
    }
    case "USER_SET_RECIPIENT": {
      return setRecipient(state, action)
    }
    default:
      return state;
  }
}