import * as React from "react";
import { connect } from "react-redux";
import { db, firebase } from "../../firebase";

export const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component {
    constructor(props: any) {
      super(props)
      this.state = {
        refUsers: null
      }
    }
    public componentDidMount() {
      const { onSetAuthUser, onSetCurrentUser }: any = this.props;

      const refUsers = db.refUsers()
      this.setState({ refUsers: db.refUsers })

      firebase.auth.onAuthStateChanged((authUser: any) => {
        refUsers.child(authUser.uid).on('value', (snapshot: any) => {
          if (authUser) {
            onSetAuthUser(authUser)
            onSetCurrentUser({
              ...snapshot.val(),
              uid: authUser.uid
            })
          } else {
            onSetAuthUser(null)
            onSetCurrentUser(null)
          }
        });
      })
    }

    public componentWillUnmount() {
      const { refUsers }: any = this.state
      refUsers.off()
    }

    public render() {
      return <Component />
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