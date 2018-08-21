import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { compose } from "recompose";
import * as routes from '../../constants/routes'
import { auth, db } from "../../firebase"
import { FormCreatePost } from './FormCreatePost'
import { PostList } from './PostList'
import { UserList } from "./UserList"

class SubforumComponent extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            error: '',
        }
    }

    public componentDidMount() {
        const {
            onSetUsers,
            onSetPosts,
            onSetSubforum,
            onSetSubscribed,
            location,
        }: any = this.props;

        const path = location.pathname;
        const prefixLength = routes.SUBFORUM.length + 1;
        const isValidPath =
            path.startsWith(routes.SUBFORUM + '/') &&
            path.length > prefixLength;

        if (isValidPath) {
            const subName = path.substring(prefixLength);

            db.onceGetSubforumByName(subName).then(snapshot => {
                if (snapshot.val()) {
                    const subforum = {
                        ...snapshot.val(),
                        name: subName
                    }
                    onSetSubforum(subforum)
                    onSetSubscribed(!!subforum.users[auth.getuid()])
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

    public subscribe = () => {
        const {
            onSetSubscribed,
            currentUser,
            subforum
        }: any = this.props;
        db.doSubscribe(subforum.name, currentUser.uid, currentUser.username)
        onSetSubscribed(true)
    }

    public unsubscribe = () => {
        const {
            onSetSubscribed,
            currentUser,
            subforum
        }: any = this.props;
        db.doUnsubscribe(subforum.name, currentUser.uid)
        onSetSubscribed(false)
    }


    public render() {
        const { users, subscribed, posts, subforum, }: any = this.props;

        return (subforum
            ? (
                <div>
                    <h1>Posts in {!!subforum && subforum.name}</h1>
                    {
                        subscribed ? <this.ButtonUnsubscribe /> : <this.ButtonSubscribe />
                    }
                    <h2>Create Post</h2>
                    <FormCreatePost />
                    {!!posts && <PostList posts={posts} />}
                    <h1>Users in {!!subforum && subforum.name}</h1>
                    {!!users && <UserList users={users} />}
                </div>
            ) : (
                <div><h3>Loading awesomeness...</h3></div>
            )
        );
    }

    private ButtonSubscribe = () => {
        return (
            <button onClick={() => this.subscribe()}>
                Subscribe
            </button>
        )
    }

    private ButtonUnsubscribe = () => {
        return (
            <button onClick={() => this.unsubscribe()}>
                Unsubscribe
            </button>
        )
    }
}

const mapStateToProps = (state: any) => ({
    users: state.subforumState.users,
    posts: state.subforumState.posts,
    subforum: state.subforumState.subforum,
    currentUser: state.userState.currentUser,
    subscribed: state.subforumState.subscribed
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetUsers: (users: any) => dispatch({ type: "SUBFORUM_SET_USERS", users }),
    onSetPosts: (posts: any) => dispatch({ type: "SUBFORUM_SET_POSTS", posts }),
    onSetSubforum: (subforum: any) => dispatch({ type: "SUBFORUM_SET_SUBFORUM", subforum }),
    onSetSubscribed: (subscribed: any) => dispatch({ type: "SUBFORUM_SET_SUBSCRIBED", subscribed }),
});

export const Subforum = compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SubforumComponent);