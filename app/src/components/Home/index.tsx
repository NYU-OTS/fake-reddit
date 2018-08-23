import * as React from "react";
import { FormCreateSubforum } from "../../containers/Home/FormCreateSubforum";
import MessageList from "../../containers/Home/MessageList";
import UserList from "../../containers/Home/UserList";
import './home.css';

interface IProps {
    currentUser: {};
}

export class Home extends React.Component<IProps> {
    public render() {
        const { currentUser } = this.props;
        return (
            currentUser ? (
                <div>
                    <div className="split left">
                        <h1>Home</h1>
                        <UserList />
                        <h2>Create Subforums</h2>
                        <FormCreateSubforum />
                    </div>

                    <div className="split right">
                        <MessageList />
                    </div>
                </div>
            ) : (<div>Loading...</div>)
        )
    }
}