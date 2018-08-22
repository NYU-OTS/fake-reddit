import * as React from 'react';
import { FormDM } from '../../containers/Home/FormDM';

interface IProps {
  currentUser: {
    username: string;
  };
  recipient: {
    username: string;
  };
  messages: {
    dm: {};
    username: string;
  };
}

export class MessageList extends React.Component<IProps> {
  public render() {
    const { messages, currentUser, recipient } = this.props;

    return (
      <div>
        <FormDM />
        <hr />
        {
          currentUser && recipient
            ?
            messages ? (
              <div>
                <h2>DM with {messages.username}:</h2>
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
                      {messages.dm[key].timestamp}
                      <span> | </span>
                      {messages.dm[key].message}
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