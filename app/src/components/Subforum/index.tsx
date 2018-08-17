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

interface InterfaceProps {
    currentUser: any;
}

interface InterfaceState {
    error: any;
    subscribed: boolean
}

class SubforumComponent extends React.Component<
    InterfaceProps, 
    InterfaceState
> {
    constructor(props: any) {
        super(props)
        this.state = {
            error: '',
            subscribed: false
        }
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
            const { currentUser } = this.props

            db.onceGetSubforumByName(subName).then(snapshot => {
                if (snapshot.val()) {
                    onSetSubforum({
                        ...snapshot.val(),
                        name: subName
                    })
                    const subscribed = currentUser 
                    ? subName in currentUser.subcriptions
                    : false;
                    this.setState({
                        ...this.state,
                        subscribed
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
        this.setState({ ...this.state, subscribed: true })
    }

    public unsubscribe = (
        subforum: {
            name: string
        },
        currentUser: {
            uid: string,
            username: string
        }
    ) => {
        db.doUnsubscribe(subforum.name, currentUser.uid)
        this.setState({ ...this.state, subscribed: false })
    }


    public render() {
        const { users, posts, subforum, currentUser }: any = this.props;
        const { subscribed } = this.state;

        const ButtonSubscribe = () => (
            <button onClick={() => this.subscribe(subforum, currentUser)}>
                Subscribe
            </button>
        )

        const ButtonUnsubscribe = () => (
            <button onClick={() => this.unsubscribe(subforum, currentUser)}>
                Unsubscribe
            </button>
        )

        return (
            <div>
                <h1>Posts in {!!subforum && subforum.name}</h1>
                {
                    subscribed ? <ButtonUnsubscribe /> : <ButtonSubscribe />
                }
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