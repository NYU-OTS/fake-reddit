import * as React from 'react';
import { connect } from 'react-redux';
import { MessageList } from '../../components/Home/MessageList'

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
  messages: state.userState.messages,
  recipient: state.userState.recipient
});

class MessageListComponent extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { messages, currentUser, recipient }: any = this.props;
    return React.createElement(MessageList, {
      messages, currentUser, recipient
    })
  }
}

export default connect(
  mapStateToProps,
)(MessageListComponent);