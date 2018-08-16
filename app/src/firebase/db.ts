import { db } from "./firebase";

export const R_USERS = 'users'

// User API
export const doCreateUser = (id: string, username: string, email: string) =>
  db.ref(`users/${id}`).set({
    email,
    username
  })

export const onceGetUsers = () => db.ref(`${R_USERS}`).once("value")
export const getUserByUID = (uid: string) => uid ? db.ref(`${R_USERS}/${uid}`) : null