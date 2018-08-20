import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { db } from "../../firebase";
import { UserList } from "../Forum/UserList";
import { withAuthorization } from "../Session/withAuthorization";
import { FormCreateSubforum } from './FormCreateSubforum';
import { FormDM } from "./FormDM";

class HomeComponent extends React.Component {
  public componentDidMount() {
    const { onSetUsers }: any = this.props;

    db.onceGetUsers().then(snapshot => {
      onSetUsers(snapshot.val())
    })
  }

  public render() {
    const { users }: any = this.props;

    return (
      <div>
        <h1>Home</h1>
        <FormDM />
        {!!users && <UserList users={users} />}
        <h2>Create Subforums</h2>
        <FormCreateSubforum />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.subforumState.users,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetUsers: (users: any) => dispatch({ type: "SUBFORUM_SET_USERS", users }),
});

const authCondition = (authUser: any) => !!authUser;

export const Home = compose(
  withAuthorization(authCondition),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomeComponent);