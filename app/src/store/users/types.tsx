// Response object for GET /u
export interface Room {
    id: string
}

export interface Role {
    room: Room,
    role: string,
}

export interface User {
    uid: string,
    username: string,
    roles: Role[],
}