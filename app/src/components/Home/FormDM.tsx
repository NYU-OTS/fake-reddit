import * as React from "react";
import { db } from "../../firebase";

interface InterfaceProps {
    currentUser: any;
    recipient: any;
}

interface InterfaceState {
    error: any;
    message: string;
}

export class FormDM extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    private static INITIAL_STATE = {
        error: null,
        message: ''
    };

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    constructor(props: InterfaceProps) {
        super(props);
        this.state = { ...FormDM.INITIAL_STATE };
    }

    public onSubmit(event: any) {
        event.preventDefault();

        const from = this.props.currentUser.uid;
        const to = this.props.recipient.uid;
        const message = this.state.message;

        db.doSendMessage(from, to, message);
        const error = {
            message: 'sent'
        }
        this.setState({
            ...FormDM.INITIAL_STATE,
            error
        });
    }

    public render() {
        const { message, error } = this.state;
        const { recipient } = this.props;

        const isInvalid = recipient === '' || message === '';

        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <h2>Direct Message</h2>
                <label>To {!!recipient && recipient.username}:</label>
                <br />
                <textarea
                    rows={4}
                    value={message}
                    onChange={event => this.setStateWithEvent(event, "message")}
                    placeholder="Message content goes here..."
                />
                <br />
                <button disabled={isInvalid} type="submit">
                    Send
                </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }

    private setStateWithEvent(event: any, columnType: string) {
        this.setState(FormDM.propKey(columnType, (event.target as any).value));
    }
}