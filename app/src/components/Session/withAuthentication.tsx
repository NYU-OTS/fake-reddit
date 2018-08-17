import * as React from "react";
import { connect } from "react-redux";
import { db, firebase } from "../../firebase";

interface InterfaceProps {
  authUser?: any;
  currentUser?: any;
}

interface InterfaceState {
  authUser?: any;
  currentUser?: any;
}

export const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    public componentDidMount() {
    const { onSetAuthUser, onSetCurrentUser }: any = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          db.onceGetUserByUID(authUser.uid).then(snapshot => {
            onSetAuthUser(authUser)
            onSetCurrentUser(snapshot.val())
          })
        } else {
          onSetAuthUser(null)
          onSetCurrentUser(null)
        }
      });
    }

    public render() {
      return <Component />;
    }
  }

  const mapDispatchToProps = (dispatch: any) => ({
    onSetAuthUser: (authUser: any) => dispatch({ type: "USER_SET_AUTH_USER", authUser }),
    onSetCurrentUser: (currentUser: any) => dispatch({ type: "USER_SET_CURRENT_USER", currentUser })
  });

  return connect(
    null,
    mapDispatchToProps
  )(WithAuthentication);
};