import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { auth, db } from "../../firebase";
import { withAuthorization } from "../Session/withAuthorization";

interface InterfaceProps {
    currentUser?: any;
}

interface InterfaceState {
    error: any;
    name: string;
    description: string;
}

const mapStateToProps = (state: any) => ({
    currentUser: state.userState.currentUser
});

export class FormCreateSubforumComponent extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    private static INITIAL_STATE = {
        error: null,
        name: '',
        description: '',
    };

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    constructor(props: InterfaceProps) {
        super(props);
        this.state = { ...FormCreateSubforumComponent.INITIAL_STATE };
    }

    public onSubmit(event: any) {
        event.preventDefault();

        const { name, description } = this.state;
        const uid = auth.getuid();
        const { currentUser } = this.props;

        const username = currentUser.username;
        db.doCreateSubforum(uid, username, name, description).then(() => {
            const error = {
                message: 'cool'
            }
            this.setState(() => ({ ...FormCreateSubforumComponent.INITIAL_STATE }));
            this.setState(FormCreateSubforumComponent.propKey("error", error));
        }).catch(error => {
            this.setState(FormCreateSubforumComponent.propKey("error", error));
        });
    }

    public render() {
        const { name, description, error } = this.state;

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
        this.setState(FormCreateSubforumComponent.propKey(columnType, (event.target as any).value));
    }
}

const authCondition = (authUser: any) => !!authUser;

export const FormCreateSubforum = compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
)(FormCreateSubforumComponent);