import * as React from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";
import { SubforumList } from "../Forum/SubforumList";

interface InterfaceProps {
  currentUser: any;
  onSetSubforums: any;
  subforums: {};
}

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
  subforums: state.forumState.subforums
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetUsers: (users: any) => dispatch({ type: "SUBFORUM_SET_USERS", users }),
  onSetSubforums: (subforums: any) => dispatch({ type: "FORUM_SET_SUBFORUMS", subforums }),
});

class LandingComponent extends React.Component<
  InterfaceProps, {}
  > {
  public componentDidMount() {
    const { onSetSubforums } = this.props
    db.onceGetSubforums().then(snapshot => {
      onSetSubforums(snapshot.val())
    })
  }

  public render() {
    const { currentUser, subforums } = this.props;
    return (
      currentUser
        ? (
          <div>
            <h2>Subforums</h2>
            <SubforumList subforums={subforums} />
          </div>
        )
        : (
          <div>
            <h2>Landing Page</h2>
          </div>
        )
    )
  }
}

export const Landing = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingComponent);