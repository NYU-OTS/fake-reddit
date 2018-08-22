import * as React from "react";
import { connect } from "react-redux";
import { auth, db } from "../../firebase";

interface InterfaceProps {
    currentUser: any;
    onSetSubforums: any;
}

interface InterfaceState {
    error: any;
    name: string;
    description: string;
}

const mapStateToProps = (state: any) => ({
    currentUser: state.userState.currentUser
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetSubforums: (subforums: any) => dispatch({ type: "FORUM_SET_SUBFORUMS", subforums }),
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
        const { currentUser, onSetSubforums } = this.props;
        const uid = auth.getuid();

        const username = currentUser.username;
        db.doCreateSubforum(uid, username, name.trim(), description).then(() => {
            const error = {
                message: 'cool'
            }
            this.setState(() => ({ ...FormCreateSubforumComponent.INITIAL_STATE }));
            this.setState(FormCreateSubforumComponent.propKey("error", error));

            db.onceGetSubforums().then(snapshot => {
                onSetSubforums(snapshot.val())
            })
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

export const FormCreateSubforum = connect(
        mapStateToProps,
        mapDispatchToProps
)(FormCreateSubforumComponent);