import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { UserList } from "../Forum/UserList";
import { withAuthorization } from "../Session/withAuthorization";
import { FormCreateSubforum } from './FormCreateSubforum';
import './index.css';
import { MessageList } from "./MessageList";

class HomeComponent extends React.Component {
  public render() {
    const { currentUser }: any = this.props;
    return (
      currentUser
        ? (
          <div>
            <div className="split left">
              <h1>Home</h1>
              <UserList />
              <h2>Create Subforums</h2>
              <FormCreateSubforum />
            </div>

            <div className="split right">
              <MessageList />
            </div>
          </div>
        )
        : (
          <div>Loading...</div>
        )
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser
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