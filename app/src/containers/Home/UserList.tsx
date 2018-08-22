import * as React from "react";
import { connect } from "react-redux";
import { UserList } from "../../components/Home/UserList";
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

interface InterfaceState {
  refMessages: any;
  refUsers: any;
}

class UserListContainer extends React.Component<{}, InterfaceState> {
  constructor(props: any) {
    super(props);

    this.state = {
      refMessages: null,
      refUsers: null
    }
  }


  public componentDidMount() {
    const { onSetUsers }: any = this.props;

    const refUsers = db.refUsers()

    this.setState({
      ...this.state,
      refUsers
    })

    refUsers.on('value', (snapshot: any) => {
      onSetUsers(snapshot.val());
    })
  }

  public componentWillUnmount() {
    const {
      onSetUsers,
      onSetRecipient,
      onSetMessages
    }: any = this.props;

    const {
      refMessages,
      refUsers
    } = this.state;

    if (refUsers) {
      refUsers.off()
    }

    if (refMessages) {
      refMessages.off()
    }

    onSetUsers(null)
    onSetRecipient(null)
    onSetMessages(null)
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
      const refMessages = db.refMessages(currentUser.uid, recipient.uid)

      this.setState({
        ...this.state,
        refMessages
      })

      refMessages.on('value', (snapshot: any) => {
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
    const { users, recipient, currentUser }: any = this.props;
    return React.createElement(UserList, {
      users,
      recipient,
      currentUser,
      showMessages: this.showMessages
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);