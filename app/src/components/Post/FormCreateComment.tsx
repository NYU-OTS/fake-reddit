import * as React from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";

interface InterfaceProps {
    post: any;
    currentUser: any;
    onSetPost: any;
}

interface InterfaceState {
    error: any;
    content: string;
}

const mapStateToProps = (state: any) => ({
    currentUser: state.userState.currentUser,
    post: state.postState.post
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetPost: (post: any) => dispatch({ type: "POST_SET_POST", post })
});

class FormCreateCommentComponent extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    private static INITIAL_STATE = {
        error: null,
        content: '',
    };

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    constructor(props: InterfaceProps) {
        super(props);
        this.state = { ...FormCreateCommentComponent.INITIAL_STATE };
    }

    public onSubmit(event: any) {
        event.preventDefault();

        const { post, currentUser, onSetPost } = this.props;
        const { content } = this.state;
        const username = currentUser.username;
        const postKey = post.key;

        if (username && content) {
            db.doCreateComment(postKey, username, content).then(() => {
                const error = {
                    message: 'nice'
                };
                this.setState(() => ({ ...FormCreateCommentComponent.INITIAL_STATE }));
                this.setState(FormCreateCommentComponent.propKey("error", error));
                
                db.onceGetPostByID(postKey).then((snapshot: any) => {
                    if (snapshot.val()) {
                        onSetPost({
                            ...snapshot.val(),
                            key: snapshot.key
                        })
                    }
                })
            })
        }
    }

    public render() {
        const { content, error } = this.state;
        const { currentUser } = this.props;

        const isInvalid = content === '';

        return currentUser
            ? (
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <textarea
                        rows={4}
                        value={content}
                        onChange={event => this.setStateWithEvent(event, "content")}
                        placeholder="Your comment goes here..."
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
        this.setState(FormCreateCommentComponent.propKey(columnType, (event.target as any).value));
    }
}

export const FormCreateComment = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormCreateCommentComponent)