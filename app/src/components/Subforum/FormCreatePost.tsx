import * as React from "react";
import { auth, db } from "../../firebase";

interface InterfaceProps {
    error?: any;
    subforum?: string;
}

interface InterfaceState {
    error: any;
    subject: string;
    content: string;
}

export class FormCreatePost extends React.Component<
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
        this.state = { ...FormCreatePost.INITIAL_STATE };
    }

    public onSubmit(event: any) {
        event.preventDefault();

        const { subject, content } = this.state;
        const { subforum } = this.props;
        const uid = auth.getuid();

        db.getUserByUID(uid).once('value', snapshot => {
            const username = snapshot.val();
            db.doCreatePost(uid, username, subforum || '', subject, content).then(() => {
                const error = {};
                this.setState(() => ({ ...FormCreatePost.INITIAL_STATE }));
                this.setState(FormCreatePost.propKey("error", error));
            })
        });
    }

    public render() {
        const { subject, content, error } = this.state;

        const isInvalid = subject === '' || content === '';

        return (
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
                    Create
                </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }

    private setStateWithEvent(event: any, columnType: string) {
        this.setState(FormCreatePost.propKey(columnType, (event.target as any).value));
    }
}