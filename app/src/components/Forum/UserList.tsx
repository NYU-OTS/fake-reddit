import * as React from "react";
import { connect } from "react-redux";
import { db } from '../../firebase';

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
  users: state.subforumState.users,
  recipient: state.userState.recipient
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetUsers: (users: any) => dispatch({ type: "SUBFORUM_SET_USERS", users }),
  onSetRecipient: (recipient: any) => dispatch({ type: "USER_SET_RECIPIENT", recipient }),
  onSetMessages: (messages: any) => dispatch({ type: 'USER_SET_MESSAGES', messages }),
});

class UserListComponent extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    const { onSetUsers }: any = this.props;
    db.onceGetUsers().then(snapshot => {
      onSetUsers(snapshot.val());
    })
  }

  public showMessages = (key: string) => {
    const {
      users, currentUser,
      onSetRecipient,
      onSetMessages
    }: any = this.props;

    const recipient = {
      ...users[key],
      uid: key
    }

    onSetRecipient(recipient)

    if (recipient && currentUser) {
      // db.onceGetMessages(currentUser.uid, recipient.uid)
      //   .then(snapshot => {
      db.refMessages(currentUser.uid, recipient.uid)
        .on('value', (snapshot: any) => {
          if (snapshot.val()) {
            onSetMessages({
              dm: { ...snapshot.val(), },
              uid: snapshot.key,
              username: recipient.username
            })
          } else {
            onSetMessages(null)
          }
        })
    }
  }

  public render() {
    const { users }: any = this.props;

    return (
      users
        ? (
          <div>
            <h2>All Users (because who needs privacy)</h2>
            {
              Object.keys(users).map(key => (
                <div key={key}>{users[key].username}
                  <span> | </span>
                  <a
                    href='#'
                    key={key}
                    onClick={() => this.showMessages(key)}
                  >
                    Message
            </a>
                </div>
              ))
            }
          </div>
        )
        : (
          <div>Loading users...</div>
        )
    );
  }
}

export const UserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListComponent);