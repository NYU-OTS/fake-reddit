import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Home } from '../../components/Home/Home'
import { withAuthorization } from "../Session/withAuthorization";

interface IProps {
  currentUser: {};
}

class HomeContainer extends React.Component<IProps> {
  constructor(props: any) {
    super(props)
  }
  public render() {
    const { currentUser } = this.props;
    return React.createElement(Home, { currentUser })
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
});

const authCondition = (authUser: any) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(
    mapStateToProps,
  )
)(HomeContainer);