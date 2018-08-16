import { db } from "./firebase";

export const R_USERS = 'users'
export const R_USERNAMES = 'usernames'
export const R_EMAILS = 'emails'

// User API
export const doCreateUser = (id: string, username: string, email: string) => {
  const keyEmail = email.replace(/\./g, ',')
  return db.ref(`${R_USERS}/${id}`).set({ email, username }).then(() => {
    db.ref(`${R_USERNAMES}/${username}`).set(id)
    db.ref(`${R_EMAILS}/${keyEmail}`).set(id)
  }).catch(error => {
    throw error
  })
}

export const onceGetUsers = () => db.ref(`${R_USERS}`).once("value")
export const getUserByUID = (uid: string) => uid ? db.ref(`${R_USERS}/${uid}`) : null