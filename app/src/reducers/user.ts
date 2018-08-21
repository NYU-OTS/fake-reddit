const INITIAL_STATE = {
  authUser: null, // firebase auth()
  currentUser: null, // user db record
  recipient: '', // UID of user
  notif: '', // notification message
}

const setAuthUser = (state: any, action: any) => ({
  ...state,
  authUser: action.authUser
});

const setRecipient = (state: any, action: any) => ({
  ...state,
  recipient: action.recipient
});

const setMessages = (state: any, action: any) => ({
  ...state,
  messages: action.messages
});

const setCurrentUser = (state: {}, action: any) => ({
  ...state,
  currentUser: action.currentUser
})

const showNotification = (state: {}, action: any) => ({
  ...state,
  notif: action.notif
})

const hideNotification = (state: {}) => ({
  ...state,
  notif: ''
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
    case "USER_SET_MESSAGES": {
      return setMessages(state, action)
    }
    case "SHOW_NOTIFICATION": {
      return showNotification(state, action)
    }
    case "HIDE_NOTIFICATION": {
      return hideNotification(state)
    }
    default:
      return state;
  }
}