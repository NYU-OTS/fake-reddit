import { db } from "./firebase";

export const R_USERS = 'users'
export const R_USERNAMES = 'usernames'
export const R_EMAILS = 'emails'
export const R_POSTS = 'posts'
export const R_SUBFORUMS = 'subforums'

export const F_SUBSCRIPTIONS = 'subscriptions'
export const F_MOD_OF = 'modOf'
export const F_OWNER_OF = 'ownerOf'
export const F_USERNAME = 'username'

export const ROLE_USER = 'user'
export const ROLE_ADMIN = 'admin'

if (!Date.now) {
  Date.now = () => new Date().getTime()
}

/*
 * Creates a user record in database
 * @param uid: auth.uid
 * @param username: username of user
 * @param email: email of user
 * @param role: either `user` or `admin`
 */
export const doCreateUser = (
  uid: string,
  username: string,
  email: string
) =>
  db.ref(`${R_USERS}/${uid}`).set({ email, username, }).then(() => {
    db.ref(`${R_USERNAMES}/${username}`).set(uid)
    db.ref(`${R_EMAILS}/${email.replace(/\./g, ',')}`).set(uid)
  }).catch(error => {
    throw error
  })


/*
 * Creates a post record in database
 * @param username: username of poster
 * @param subforum: sub of subforum
 * @param subject: subject of post
 * @param content: content of post
 */
export const doCreatePost = (
  username: string,
  subforum: string,
  subject: string,
  content: string
) => {
  return db.ref(`${R_POSTS}/${R_SUBFORUMS}/${subforum}`)
    .push({
      subject, content,
      poster: username,
      timestamp: Date.now()
    })
    .then(snap => {
      db.ref(`${R_POSTS}/${R_USERS}/${username}`)
        .push({
          subject, content, subforum,
          timestamp: Date.now()
        })
    })
}

/*
 * Creates a subforum record in database
 * @param uid: auth.uid
 * @param sub: sub of subforum
 * @param decsription: description of subforum
 */
export const doCreateSubforum = (
  uid: string,
  username: string,
  sub: string,
  description: string
) => {
  const mods = {}
  const users = {}
  const owner = {}
  mods[uid] = username
  users[uid] = username
  owner[uid] = username
  return db.ref(`${R_SUBFORUMS}/${sub}`).set({ description, mods, users, owner })
    .then(() => {
      db.ref(`${R_USERS}/${uid}/${F_MOD_OF}/${sub}`).set(sub)
      db.ref(`${R_USERS}/${uid}/${F_OWNER_OF}/${sub}`).set(sub)
    })
}

/*
 * Adds a user to a subforum
 * @param sub: Name of subforum
 * @param uid: UID of User
 * @param username: Username of User
 */
export const doSubscribe = (sub: string, uid: string, username: string) => {
  db.ref(`${R_SUBFORUMS}/${sub}/${R_USERS}/${uid}`).set(username)
  db.ref(`${R_USERS}/${uid}/${F_SUBSCRIPTIONS}/${sub}`).set(sub)
}

/*
 * Adds a user to a subforum
 * @param sub: Name of subforum
 * @param uid: UID of User
 * @param username: Username of User
 */
export const doUnsubscribe = (sub: string, uid: string) => {
  db.ref(`${R_SUBFORUMS}/${sub}/${R_USERS}/${uid}`).remove()
  db.ref(`${R_USERS}/${uid}/${F_SUBSCRIPTIONS}/${sub}`).remove()
}

/*
 * Retrieve user information by its UID
 * @param uid: auth.uid
 */
export const getUserByUID = (uid: string) => db.ref(`${R_USERS}/${uid}`)

/*
 * Retrieve username by UID
 * @param uid: auth.uid
 */
export const getUsernameByUID = (uid: string) =>
  db.ref(`${R_USERS}/${uid}/${F_USERNAME}`)

/*
 * Grab the list of user once
 */
export const onceGetUsers = () => db.ref(`${R_USERS}`).once("value")

/*
 * Grab info of user by UID
 * @param uid: UID of user
 */
export const onceGetUserByUID = (uid: string) =>
  db.ref(`${R_USERS}/${uid}`).once('value')

/*
 * Grab info of subforum bysube
 * @param nane: sub of subforum
 */
export const onceGetSubforumByName = (sub: string) =>
  db.ref(`${R_SUBFORUMS}/${sub}`).once('value')

/*
 * Grab list of posts in a subforum
 * @param sub: sub of subforum
 */
export const onceGetPostsBySubforum = (sub: string) =>
  db.ref(`${R_POSTS}/${R_SUBFORUMS}/${sub}`).once('value')

/*
 * Grab list of posts from a user
 * @param uid: UID of user
 */
export const onceGetPostsByUser = (uid: string) =>
  db.ref(`${R_POSTS}/${R_USERS}/${uid}`).once('value')

/*
 * Grab post information by ID
 * @param id: ID of post
 */
export const onceGetPost = (id: string) =>
  db.ref(`${R_POSTS}/${id}`).once('value')

/*
 * Grab list of users in a subforum
 * @param sub of subforum
 */
export const onceGetUsersBySubforum = (sub: string) =>
  db.ref(`${R_SUBFORUMS}/${sub}/${R_USERS}`).once('value')

/*
 * Grab the list of subforums once
 * @param sub: sub of subforum
 */
export const onceGetSubforums = () =>
  db.ref(`${R_SUBFORUMS}`).once("value")

/*
 * Grab the list of posts in a subforum once
 */
export const onceGetPosts = () => 
db.ref(`${R_SUBFORUMS}/${R_POSTS}`).once("value")