const INITIAL_STATE = {
    mods: {},
    users: {},
    subforum: ''
}

const setUsers = (state: {}, action: any) => ({
    ...state,
    users: action.users
})

const setPosts = (state: {}, action: any) => ({
    ...state,
    posts: action.posts
})

const setSubforum = (state: {}, action: any) => ({
    ...state,
    subforum: action.subforum
})

export function postReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "POST_SET_USERS": {
            return setUsers(state, action)
        }
        case "POST_SET_POSTS": {
            return setPosts(state, action)
        }
        case "POST_SET_SUBFORUM": {
            return setSubforum(state, action)
        }
        default:
            return state;
    }
}