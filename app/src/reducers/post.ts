const INITIAL_STATE = {
    poster: {},
    comments: {},
    subforum: '',
}

const setPoster = (state: {}, action: any) => ({
    ...state,
    users: action.users
})

const setSubject = (state: {}, action: any) => ({
    ...state,
    posts: action.posts
})

const setContent = (state: {}, action: any) => ({
    ...state,
    subforum: action.subforum
})

const setComments = (state: {}, action: any) => ({
    ...state,
    comments: action.comments
})

export function postReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "POST_SET_POSTER": {
            return setPoster(state, action)
        }
        case "POST_SET_SUBJECT": {
            return setSubject(state, action)
        }
        case "POST_SET_CONTENT": {
            return setContent(state, action)
        }
        case "POST_SET_COMMENT": {
            return setComments(state, action)
        }
        default:
            return state;
    }
}