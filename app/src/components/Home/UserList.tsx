import * as React from "react";

interface IProps {
    users: {},
    recipient: {};
    currentUser: {};
}

export class UserList extends React.Component<IProps> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { users, showMessages }: any = this.props;

        return (
            users ? (
                <div>
                    <h2>All Users (because who needs privacy)</h2>
                    {
                        Object.keys(users).map(key => (
                            <div key={key}>{users[key].username}
                                <span> | </span>
                                <button onClick={() => showMessages(key)}>
                                    Message
                                </button>
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