import * as PropTypes from 'prop-types'
import * as React from 'react';
import { connect } from 'react-redux';
import { MessageList } from '../../components/Home/MessageList'

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
  messages: state.userState.messages,
  recipient: state.userState.recipient
});

class MessageListContainer extends React.Component {
  public static propTypes: {
    currentUser: PropTypes.Validator<object>;
    messages: PropTypes.Requireable<object>;
    recipient: PropTypes.Requireable<object>;
  };

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

MessageListContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  messages: PropTypes.object,
  recipient: PropTypes.object
}

export default connect(
  mapStateToProps,
)(MessageListContainer);