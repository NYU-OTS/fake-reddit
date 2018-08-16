import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { db } from "../../firebase";
import { UserList } from "../Home/UserList";
import { withAuthorization } from "../Session/withAuthorization";
import { FormCreatePost } from './FormCreatePost';
import { PostList } from './PostList';

class SubforumComponent extends React.Component {
    public componentDidMount() {
        const { onSetUsers, onSetPosts }: any = this.props;

        db.onceGetPosts().then(snapshot => {
            onSetPosts(snapshot.val())
        })
        db.onceGetUsers().then(snapshot => {
            onSetUsers(snapshot.val())
        })

    }

    public render() {
        const { users, posts }: any = this.props;

        return (
            <div>
                <h1>Posts</h1>
                {!!posts && <PostList posts={posts} />}
                <h2>Create Post</h2>
                <FormCreatePost />
                {!!users && <UserList users={users} />}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    mods: state.subforumState.mods,
    users: state.subforumState.users,
    posts: state.subforumState.posts,
    subforum: state.subforumState.subforum
});

const mapDispatchToProps = (dispatch: any) => ({
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
)(SubforumComponent);