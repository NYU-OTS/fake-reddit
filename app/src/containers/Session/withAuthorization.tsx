import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

interface InterfaceProps {
  authUser?: any;
  currentUser?: any;
}

export const withAuthorization = (condition: any) => (Component: any) => {
  class WithAuthorization extends React.Component<InterfaceProps, {}> {
    public render() {
      return this.props.authUser ? <Component /> : <div>Loading...</div>;
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