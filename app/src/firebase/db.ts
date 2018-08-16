import { db } from "./firebase";

export const R_USERS = 'users'
export const R_USERNAMES = 'usernames'
export const R_EMAILS = 'emails'
export const R_POSTS = 'posts'
export const R_SUBFORUMS = 'subforums'

export const F_MOD_FOR = 'modFor'
export const F_USERNAME = 'username'

export const ROLE_USER = 'user'
export const ROLE_ADMIN = 'admin'

/*
 * Creates a user record in database
 * @param uid: auth.uid
 * @param username: username of user
 * @param email: email of user
 * @param role: either `user` or `admin`
 */
export const doCreateUser = (uid: string, username: string, email: string, role: string) =>
  db.ref(`${R_USERS}/${uid}`).set({ email, username, role }).then(() => {
    db.ref(`${R_USERNAMES}/${username}`).set(uid)
    db.ref(`${R_EMAILS}/${email.replace(/\./g, ',')}`).set(uid)
  }).catch(error => {
    throw error
  })

/*
 * Creates a post record in database
 * @param uid: auth.uid
 * @param username: username of poster
 * @param subforum: name of subforum
 * @param subject: subject of post
 * @param content: content of post
 */
export const doCreatePost = (uid: string, username: string, subforum: string, subject: string, content: string) => {
  const creator = {}
  creator[uid] = username
  return db.ref(`${R_POSTS}`).push({ subject, content, creator, subforum }).then(snap => {
    db.ref(`${R_USERS}/${uid}/${R_POSTS}/${snap.key}`).set(snap.subject)
  })
}

/*
 * Creates a subforum record in database
 * @param uid: auth.uid
 * @param name: name of subforum
 * @param decsription: description of subforum
 */
export const doCreateSubforum = (uid: string, username: string, name: string, description: string) => {
  const mods = {}
  const users = {}
  mods[uid] = username
  users[uid] = username
  return db.ref(`${R_SUBFORUMS}/${name}`).set({ description, mods })
    .then(() => {
      db.ref(`${R_USERS}/${uid}/${F_MOD_FOR}/${name}`).set(name)
    })
}

/*
 * Subscribe to a subforum
 * @param uid: auth.uid
 * @param name: name of subforum
 * @param decsription: description of subforum
 */
export const doSubscribe = (uid: string, name: string) =>
  db.ref(`${R_SUBFORUMS}/${name}/${R_USERS}/${uid}`).set(uid).then(() => {
    getUserByUID(uid).child(`${R_SUBFORUMS}/${name}`).set(name)
  })

/*
 * Retrieve user information by its UID
 * @param uid: auth.uid
 */
export const getUserByUID = (uid: string) => db.ref(`${R_USERS}/${uid}`)

/*
 * Retrieve username by UID
 * @param uid: auth.uid
 */
export const getUsernameByUID = (uid: string) => db.ref(`${R_USERS}/${uid}/${F_USERNAME}`)

/*
 * Grab the list of user once
 */
export const onceGetUsers = () => db.ref(`${R_USERS}`).once("value")

/*
 * Grab the list of subforums once
 */
export const onceGetSubforums = () => db.ref(`${R_SUBFORUMS}`).once("value")

/*
 * Grab the list of posts in a subforum once
 */
export const onceGetPosts = () => db.ref(`${R_SUBFORUMS}/${R_POSTS}`).once("value")