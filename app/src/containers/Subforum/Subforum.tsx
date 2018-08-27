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
    private INITIAL_STATE = {
        error: '',
        refSubforum: null
    }

    constructor(props: any) {
        super(props)
        this.state = this.INITIAL_STATE
    }

    public componentWillUnmount() {
        const { refSubforum }: any = this.state;
        this.setState(this.INITIAL_STATE);
        refSubforum.off()
    }

    public componentDidMount() {
        const {
            onSetUsers,
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
            let subName = path.substring(prefixLength);
            if (subName.indexOf('/') > 0) {
                subName = subName.substring(0, subName.indexOf('/'))
            }

            const refSubforum = db.refSubforum(subName)
            this.setState({ ...this.state, refSubforum })
            refSubforum.on('value', (snapshot: any) => {
                if (snapshot.val()) {
                    const subforum = {
                        ...snapshot.val(),
                        name: subName
                    }
                    onSetSubforum(subforum)
                    onSetUsers(subforum.users)
                    onSetSubscribed(!!subforum.users
                        ? !!subforum.users[auth.getuid()]
                        : false
                    )
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
        const { users, subscribed, subforum, }: any = this.props;

        return (subforum
            ? (
                <div>
                    <h1>Posts in {!!subforum && subforum.name}</h1>
                    {
                        subscribed ? <this.ButtonUnsubscribe /> : <this.ButtonSubscribe />
                    }
                    <h2>Create Post</h2>
                    <FormCreatePost />
                    <PostList />
                    <h1>Users in {!!subforum && subforum.name}</h1>
                    {!!users && <UserList users={users} />}
                </div>
            ) : (
                <div><h3>Loading awesomeness...</h3></div>
            )
        );
    }

    private ButtonSubscribe = () => {
        const { currentUser }: any = this.props
        return (
            <button
                onClick={() => this.subscribe()}
                disabled={!currentUser}
            >
                Subscribe
            </button>
        )
    }

    private ButtonUnsubscribe = () => {
        const { currentUser }: any = this.props
        return (
            <button
                onClick={() => this.unsubscribe()}
                disabled={!currentUser}
            >
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