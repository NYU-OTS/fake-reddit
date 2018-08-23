import { connect } from "react-redux";
import { compose } from "recompose";
import { withAuthorization } from "../Session/withAuthorization";
import * as React from "react"; // tslint:disable-line
import { Account } from "../../components/User/Account";

interface IAuthProps {
  authUser: { email: string } | null
}

class AccountContainer extends React.Component<IAuthProps> {
  public render() {
    const { authUser } = this.props;
    return React.createElement(Account, authUser)
  }
}

const mapStateToProps = (state: {
  userState: IAuthProps
}) => ({
  authUser: state.userState.authUser
});

const authCondition = (authUser: {} | null) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountContainer);