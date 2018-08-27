import * as React from "react";
import FormCreateSubforum from "../../containers/Home/FormCreateSubforum";
import MessageList from "../../containers/Home/MessageList";
import UserList from "../../containers/Home/UserList";

interface IProps {
    currentUser: {};
}

export class Home extends React.Component<IProps> {
    public render() {
        const { currentUser } = this.props;
        return (
            currentUser ? (
                <div>
                    <div className='row'>
                        <div className="col-sm">
                            <h1>Home</h1>
                            <hr />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-sm">
                            <UserList />
                            <hr />
                            <h2>Create Subforums</h2>
                            <FormCreateSubforum />
                        </div>
                        <div className="col-sm">
                            <MessageList />
                        </div>
                    </div>
                </div>
            ) : (<div>Loading...</div>)
        )
    }
}