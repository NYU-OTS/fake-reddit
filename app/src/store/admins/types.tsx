// Response object for GET /admin
export interface Admin {
    uid: string,
    role: string,
    username: string,
}

export type ApiResponse = Record<string, any>

export const enum AdminsActionTypes {
    FETCH_REQUEST = '@@admins/FETCH_REQUEST',
    FETCH_SUCCESS = '@@admins/FETCH_SUCCESS',
    FETCH_ERROR = '@@admins/FETCH_ERROR',
    SELECTED = '@@admins/SELECTED'
}

export interface AdminState {
    readonly loading: boolean,
    readonly data: Admin[],
    readonly errors?: string
}