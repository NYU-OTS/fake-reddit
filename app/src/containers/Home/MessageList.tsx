import * as React from 'react';
import { connect } from 'react-redux';
import { FormDM } from './FormDM';

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

    return (
      <div>
        <FormDM />
        <hr />
        {
          currentUser && recipient
            ? 
            messages ? (
              <div>
                <h2>DM with { messages.username }:</h2>
                {
                  // uid is user UID
                  Object.keys(messages.dm).map(key => (
                    <div key={key}>
                      { 
                        messages.dm[key].type === 'from'
                          ? recipient.username
                          : currentUser.username
                      }
                      <span> | </span> 
                      { messages.dm[key].timestamp }
                      <span> | </span> 
                      { messages.dm[key].message }
                    </div>
                  ))
                }
              </div>
            ) : (
              <div>You haven't chatted with this user.</div>
            )
            : (
              <div>Click on a user to view messages</div>
            )
        }
      </div>
    );
  }
}

export const MessageList = connect(
  mapStateToProps,
)(MessageListComponent);