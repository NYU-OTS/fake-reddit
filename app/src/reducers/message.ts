const INITIAL_STATE = {
  messages: null, // DM message
}

const setMessages = (state: any, action: any) => ({
  ...state,
  messages: action.messages
});

export function messageReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "MESSAGE_SET_MESSAGES": {
      return setMessages(state, action)
    }
    default:
      return state;
  }
}