const INITIAL_STATE = {
    post: {},
    comments: {}
}

const setPost = (state: {}, action: any) => ({
    ...state,
    post: action.post
})

export function postReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "POST_SET_POST": {
            return setPost(state, action)
        }
        default:
            return state;
    }
}