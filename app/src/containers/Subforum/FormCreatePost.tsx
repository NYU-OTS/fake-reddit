import * as React from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";

interface InterfaceProps {
    subforum: any;
    currentUser: any;
    onSetPosts: any;
}

interface InterfaceState {
    error: any;
    subject: string;
    content: string;
}

const mapStateToProps = (state: any) => ({
    currentUser: state.userState.currentUser,
    subforum: state.subforumState.subforum
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetPosts: (posts: any) => dispatch({ type: "SUBFORUM_SET_POSTS", posts }),
});

class FormCreatePostComponent extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    private static INITIAL_STATE = {
        error: null,
        subject: '',
        content: '',
    };

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    constructor(props: InterfaceProps) {
        super(props);
        this.state = { ...FormCreatePostComponent.INITIAL_STATE };
    }

    public onSubmit(event: any) {
        event.preventDefault();

        const { subject, content } = this.state;
        const { subforum, currentUser, onSetPosts } = this.props;

        const subName = subforum.name;
        const username = currentUser.username;

        if (username && subName) {
            db.doCreatePost(username, subName, subject, content).then(() => {
                const error = {
                    message: 'nice'
                };
                this.setState(() => ({ ...FormCreatePostComponent.INITIAL_STATE }));
                this.setState(FormCreatePostComponent.propKey("error", error));
                
                db.onceGetPostsBySubforum(subName).then(snapshot => {
                    if (snapshot.val()) {
                        onSetPosts(snapshot.val())
                    }
                })
            })
        }
    }

    public render() {
        const { subject, content, error } = this.state;
        const { currentUser } = this.props;

        const isInvalid = subject === '' || content === '';

        return currentUser
            ? (
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <input
                        value={subject}
                        onChange={event => this.setStateWithEvent(event, "subject")}
                        type="text"
                        placeholder="Give it a subject"
                    />
                    <br />
                    <textarea
                        rows={4}
                        value={content}
                        onChange={event => this.setStateWithEvent(event, "content")}
                        placeholder="Enter your content here..."
                    />
                    <button disabled={isInvalid} type="submit">
                        Post
                </button>
                    {error && <p>{error.message}</p>}
                </form>
            )
            : (
                <div>Login please</div>
            )
    }

    private setStateWithEvent(event: any, columnType: string) {
        this.setState(FormCreatePostComponent.propKey(columnType, (event.target as any).value));
    }
}

export const FormCreatePost = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormCreatePostComponent)