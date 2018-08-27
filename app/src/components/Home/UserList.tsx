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
                    <h2>All Users</h2>
                    {
                        Object.keys(users).map(key => {
                            return (
                                <div key={key} className='row'>
                                    <div className="col-sm">{users[key].username}</div>
                                    <div className="col-sm">
                                        <button onClick={() => showMessages(key)} className='btn btn-link p-0'>
                                            Message
                                    </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
                : (
                    <div>Loading users...</div>
                )
        );
    }
}