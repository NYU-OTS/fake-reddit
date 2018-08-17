import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { compose } from "recompose"
import * as routes from '../../constants/routes'
import { db } from "../../firebase"
import { withAuthorization } from "../Session/withAuthorization"
import { FormCreatePost } from './FormCreatePost'
import { PostList } from './PostList'
import { UserList } from "./UserList"

class SubforumComponent extends React.Component {
    constructor(props: any) {
        super(props)
    }

    public componentDidMount() {
        const { onSetUsers, onSetPosts, onSetSubforum, location }: any = this.props;
        const path = location.pathname;
        const prefixLength = routes.SUBFORUM.length + 1;
        const isValidPath =
            path.startsWith(routes.SUBFORUM + '/') &&
            path.length > prefixLength;

        if (isValidPath) {
            const subName = path.substring(prefixLength);

            db.onceGetSubforumByName(subName).then(snapshot => {
                if (snapshot.val()) {
                    onSetSubforum({
                        ...snapshot.val(),
                        name: subName
                    })
                }
            })

            db.onceGetPostsBySubforum(subName).then(snapshot => {
                if (snapshot.val()) {
                    onSetPosts(snapshot.val())
                }
            }).catch(error => {
                console.log(error)
            })

            db.onceGetUsersBySubforum(subName).then(snapshot => {
                if (snapshot.val()) {
                    onSetUsers(snapshot.val())
                }
            })
        }
    }

    public subscribe = (
        subforum: {
            name: string
        },
        currentUser: {
            uid: string,
            username: string
        }
    ) => {
        db.doSubscribe(subforum.name, currentUser.uid, currentUser.username)
        this.forceUpdate()
    }


    public render() {
        const { users, posts, subforum, currentUser }: any = this.props;
        const subscribed = currentUser ? currentUser.uid in users : false;

        return (
            <div>
                <h1>Posts in {!!subforum && subforum.name}</h1>
                <button
                    onClick={() => this.subscribe(subforum, currentUser)}
                    disabled={subscribed}
                >
                    {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>

                <h2>Create Post</h2>
                <FormCreatePost />
                {!!users && <UserList users={users} />}
                {!!posts && <PostList posts={posts} />}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    mods: state.subforumState.mods,
    users: state.subforumState.users,
    posts: state.subforumState.posts,
    subforum: state.subforumState.subforum,
    currentUser: state.userState.currentUser
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetCurrentUser: (user: any) => dispatch({ type: "USER_SET_CURRENT_USER", user }),
    onSetUsers: (users: any) => dispatch({ type: "SUBFORUM_SET_USERS", users }),
    onSetPosts: (posts: any) => dispatch({ type: "SUBFORUM_SET_POSTS", posts }),
    onSetSubforum: (subforum: any) => dispatch({ type: "SUBFORUM_SET_SUBFORUM", subforum }),
});

const authCondition = (authUser: any) => !!authUser;

export const Subforum = compose(
    withAuthorization(authCondition),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(withRouter(SubforumComponent));