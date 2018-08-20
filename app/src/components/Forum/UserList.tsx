import * as React from "react";
import { connect } from "react-redux";

interface InterfaceProps {
  users?: any;
}

const mapDispatchToProps = (dispatch: any) => ({
  onSetRecipient: (recipient: any) => dispatch({ type: "USER_SET_RECIPIENT", recipient }),
});

class UserListComponent extends React.Component<InterfaceProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { users, onSetRecipient }: any = this.props;

    return (
      <div>
        <h2>All Users (because who needs privacy)</h2>
        {
          Object.keys(users).map(key => (
            <div key={key}>{users[key].username}
              <span> | </span>
              <a
                href='#'
                key={key}
                onClick={
                  () => onSetRecipient({
                      ...users[key],
                      uid: key
                  })
                }
              >
                Message
            </a>
            </div>
          ))
        }
      </div>
    );
  }
}

export const UserList = connect(
  null,
  mapDispatchToProps
)(UserListComponent);