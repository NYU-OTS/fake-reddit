// Response object for GET /u
export interface User {
    uid: string,
    username: string,
    posts: [],
    messages: [],
    email: []
}

export type APIResponse = Record<string, any>

export const enum UserActionTypes {
    FETCH_REQUEST = '@@user/FETCH_REQUEST',
    FETCH_SUCCESS = '@@user/FETCH_SUCCESS',
    FETCH_ERROR = '@@user/FETCH_ERROR'
}

export interface UserState {
    readonly loading: boolean,
    readonly data: User[],
    readonly errors: string
}