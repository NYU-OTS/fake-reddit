import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
// import * as routes from "../../constants/routes";
// import { firebase } from "../../firebase";

interface InterfaceProps {
  // history?: any;
  authUser?: any;
  currentUser?: any;
}

export const withAuthorization = (condition: any) => (Component: any) => {
  class WithAuthorization extends React.Component<InterfaceProps, any> {
    // public componentDidMount() {
    //   firebase.auth.onAuthStateChanged(authUser => {
    //     if (!condition(authUser)) {
    //       this.props.history.push(routes.SIGN_IN);
    //     }
    //   });
    // }

    public render() {
      return this.props.authUser ? <Component /> : <div>Please log in</div>;
    }
  }

  const mapStateToProps = (state: any) => ({
    authUser: state.userState.authUser,
    currentUser: state.userState.currentUser
  });

  return compose(
    withRouter,
    connect(mapStateToProps)
  )(WithAuthorization);
};