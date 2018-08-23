import { db } from './firebase';

export const R_USERS = 'users'
export const R_USERNAMES = 'usernames'
export const R_EMAILS = 'emails'
export const R_POSTS = 'posts'
export const R_SUBFORUMS = 'subforums'
export const R_COMMENTS = 'comments'

export const F_SUBSCRIPTIONS = 'subscriptions'
export const F_DM = 'dm'
export const F_MOD_OF = 'modOf'
export const F_OWNER_OF = 'ownerOf'
export const F_USERNAME = 'username'
export const F_KEYS = 'keys'
export const F_OWNER = 'owner'

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
 * Creates a comment in a post
 * @param postKey: key of post
 * @param poster: username of user
 * @param content: comment content
 */
export const doCreateComment = (
  postKey: string,
  poster: string,
  content: string,
) => {
  const timestamp = Date.now()
  return db.ref(`${R_COMMENTS}/${postKey}`)
    .push({ content, poster, timestamp })
}

/*
 * Deletes a comment in a post
 * @param postKey: key of post
 * @param commentKey: key of comment
 */
export const doDeleteComment = (
  postKey: string,
  commentKey: string
) => db.ref(`${R_COMMENTS}/${postKey}/${commentKey}`).remove()

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
  const timestamp = Date.now()
  return db.ref(`${R_POSTS}/${F_KEYS}`)
    .push({
      subject, content, subforum, timestamp,
      poster: username,
    })
    .then(snap => {
      db.ref(`${R_POSTS}/${R_SUBFORUMS}/${subforum}/${snap.key}`)
        .set({
          subject, content, timestamp, poster: username,
        })
      db.ref(`${R_POSTS}/${R_USERS}/${username}/${snap.key}`)
        .set({
          subject, content, subforum, timestamp
        })
    })
}

/*
 * Deletes a post
 * @param postKey: key of post
 */
export const doDeletePost = (
  postKey: string,
) =>
  db.ref(`${R_POSTS}/${F_KEYS}/${postKey}`).once('value', snapPost => {
    const poster = snapPost.val().poster
    db.ref(`${R_POSTS}/${R_USERS}/${poster}/${postKey}`).once('value', snapUser => {
      const subforum = snapUser.val().subforum
      db.ref(`${R_POSTS}/${R_SUBFORUMS}/${subforum}/${postKey}`).remove()
    }).then(() => db.ref(`${R_POSTS}/${R_USERS}/${poster}/${postKey}`).remove())
  }).then(() => db.ref(`${R_POSTS}/${F_KEYS}/${postKey}`).remove())

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
 * Deletes a subforum
 * @param subName: name of subforum
 */
export const doDeleteSubforum = (
  subName: string,
) =>
  db.ref(`${R_SUBFORUMS}/${subName}`).once('value', snapSub => {
    const owner = snapSub.val().owner
    db.ref(`${R_USERS}/${owner}`)
      .once('value', snapOwner => {
        snapOwner.forEach(child => {
          // remove subforum from owner(s)
          db.ref(`${R_USERS}/${child.key}/${F_OWNER_OF}/${subName}`).remove()
        })
      })
    db.ref(`${R_POSTS}/${R_SUBFORUMS}/${subName}/${R_POSTS}`)
      .once('value', snapPosts => {
        snapPosts.forEach(child => {
          // remove related posts from users
          db.ref(`${R_POSTS}/${R_USERS}/${child.val().poster}/${child.key}`).remove()
        })
      })
      // remove subforum from posts
      .then(() => db.ref(`${R_POSTS}/${R_SUBFORUMS}/${subName}`).remove())
  }).then(() => db.ref(`${R_SUBFORUMS}/${subName}`).remove()) // remove subforum

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
 * Sends a message
 * @param from: UID of sender
 * @param to: UID of receiver
 * @param message: Message being sent
 */
export const doSendMessage = (from: string, to: string, message: string) => {
  const timestamp = Date.now()
  return db.ref(`${R_USERS}/${from}/${F_DM}/${to}`)
    .push({
      message, timestamp,
      type: 'to'
    })
    .then(snap => {
      db.ref(`${R_USERS}/${to}/${F_DM}/${from}/${snap.key}`)
        .set({
          message, timestamp,
          type: 'from'
        })
    })
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
export const onceGetUsers = () => db.ref(`${R_USERS}`).once('value')

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
 * Grab list of comments from post
 * @param key: ID of post
 */
export const onceGetCommentsByPost = (key: string) =>
  db.ref(`${R_COMMENTS}/${key}`).once('value')

/*
 * Grab post information by ID
 * @param id: ID of post
 */
export const onceGetPostByID = (id: string) =>
  db.ref(`${R_POSTS}/${F_KEYS}/${id}`).once('value')

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
  db.ref(`${R_SUBFORUMS}`).once('value')

/*
 * Grab the list of posts in a subforum once
 */
export const onceGetPosts = () =>
  db.ref(`${R_SUBFORUMS}/${R_POSTS}`).once('value')

/*
 * Gets messages from recipient
 * @param sender: sender's UID
 * @param recipient: recipient's UID
 */
export const onceGetMessages = (
  sender: string,
  recipient: string
) =>
  db.ref(`${R_USERS}/${sender}/${F_DM}/${recipient}`).once('value')

export const refMessages = (
  sender: string,
  recipient: string
) => db.ref(`${R_USERS}/${sender}/${F_DM}/${recipient}`)

export const refUsers = () => db.ref(`${R_USERS}`)
export const refSubforums = () => db.ref(`${R_SUBFORUMS}`)
export const refPosts = () => db.ref(`${R_POSTS}`)
export const refPostsBySubforum = (subName: string) =>
  db.ref(`${R_POSTS}/${R_SUBFORUMS}/${subName}`)
export const refSubforum = (name: string) =>
  db.ref(`${R_SUBFORUMS}/${name}`)
export const refComments = () => db.ref(`${R_COMMENTS}`)