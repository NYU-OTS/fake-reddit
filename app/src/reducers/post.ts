const INITIAL_STATE = {
    post: null,
    comments: null
}

const setPost = (state: {}, action: any) => ({
    ...state,
    post: action.post
})

const setComments = (state: {}, action: any) => ({
    ...state,
    comments: action.comments
})

export function postReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "POST_SET_POST": {
            return setPost(state, action)
        }
        case "POST_SET_COMMENTS": {
            return setComments(state, action)
        }
        default:
            return state;
    }
}