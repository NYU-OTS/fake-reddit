import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { auth, db } from "../../firebase";
import { withAuthorization } from "../Session/withAuthorization";

interface InterfaceProps {
    error?: any;
    currentUser?: any;
}

interface InterfaceState {
    error: any;
    name: string;
    description: string;
    currentUser: any;
}

const mapStateToProps = (state: any) => ({
    users: state.subforumState.users,
    subforums: state.forumState.subforums,
    currentUser: state.sessionState.currentUser
});

export class FormCreateSubforum extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    private static INITIAL_STATE = {
        error: null,
        name: '',
        description: '',
        currentUser: null
    };

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    constructor(props: InterfaceProps) {
        super(props);
        this.state = { ...FormCreateSubforum.INITIAL_STATE };
    }

    public onSubmit(event: any) {
        event.preventDefault();

        const { name, description, currentUser } = this.state;
        const uid = auth.getuid();

        const username = currentUser.username;
        console.log(username);
        db.doCreateSubforum(uid, username, name, description).then(() => {
            const error = {}
            this.setState(() => ({ ...FormCreateSubforum.INITIAL_STATE }));
            this.setState(FormCreateSubforum.propKey("error", error));
        }).catch(error => {
            this.setState(FormCreateSubforum.propKey("error", error));
        });
    }

    public render() {
        const { name, description, error } = this.state;
        const { currentUser } = this.props;

        console.log(currentUser)

        const isInvalid = name === '' || description === '';

        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <input
                    value={name}
                    onChange={event => this.setStateWithEvent(event, "name")}
                    type="text"
                    placeholder="Give it a name"
                />
                <br />
                <textarea
                    rows={4}
                    value={description}
                    onChange={event => this.setStateWithEvent(event, "description")}
                    placeholder="Enter your description here..."
                />
                <button disabled={isInvalid} type="submit">
                    Create
                </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }

    private setStateWithEvent(event: any, columnType: string) {
        this.setState(FormCreateSubforum.propKey(columnType, (event.target as any).value));
    }
}

const authCondition = (authUser: any) => !!authUser;

export const Home = compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
)(FormCreateSubforum);