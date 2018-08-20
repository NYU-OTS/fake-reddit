import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { db } from "../../firebase";
import { withAuthorization } from "../Session/withAuthorization";

interface InterfaceProps {
    currentUser: any;
    recipient: any;
}

interface InterfaceState {
    error: any;
    message: string;
}

const mapStateToProps = (state: any) => ({
    currentUser: state.userState.currentUser,
    recipient: state.userState.recipient
});

export class FormDMComponent extends React.Component<
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
        this.state = { ...FormDMComponent.INITIAL_STATE };
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
            ...FormDMComponent.INITIAL_STATE,
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
        this.setState(FormDMComponent.propKey(columnType, (event.target as any).value));
    }
}

const authCondition = (authUser: any) => !!authUser;

export const FormDM = compose(
    withAuthorization(authCondition),
    connect(
        mapStateToProps,
    )
)(FormDMComponent);