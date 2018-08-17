import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { db } from "../../firebase";
import { withAuthorization } from "../Session/withAuthorization";
import { FormCreateSubforum } from './FormCreateSubforum';
import { SubforumList } from './SubforumList';
import { UserList } from "./UserList";

class HomeComponent extends React.Component {
  public componentDidMount() {
    const { onSetUsers, onSetSubforums }: any = this.props;

    db.onceGetSubforums().then(snapshot => {
      onSetSubforums(snapshot.val())
    })
    db.onceGetUsers().then(snapshot => {
      onSetUsers(snapshot.val())
    })
  }

  public render() {
    const { users, subforums }: any = this.props;

    return (
      <div>
        <h1>Home</h1>
        {!!subforums && <SubforumList subforums={subforums} />}
        <h2>Create Subforums</h2>
        <FormCreateSubforum />
        {!!users && <UserList users={users} />}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.subforumState.users,
  subforums: state.forumState.subforums
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetUsers: (users: any) => dispatch({ type: "SUBFORUM_SET_USERS", users }),
  onSetSubforums: (subforums: any) => dispatch({ type: "FORUM_SET_SUBFORUMS", subforums }),
});

const authCondition = (authUser: any) => !!authUser;

export const Home = compose(
  withAuthorization(authCondition),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomeComponent);
