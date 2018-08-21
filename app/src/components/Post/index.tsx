import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import * as routes from '../../constants/routes'
import { db } from "../../firebase"
import { CommentList } from './CommentList'
import { FormCreateComment } from './FormCreateComment'

class PostComponent extends React.Component {
    constructor(props: any) {
        super(props)
    }

    public componentDidMount() {
        const { onSetPost, location }: any = this.props;
        const path = location.pathname;
        const prefixLength = routes.POST.length + 1;
        const isValidPath =
            path.startsWith(routes.POST + '/') &&
            path.length > prefixLength;

        if (isValidPath) {
            const postId = path.substring(prefixLength);

            db.onceGetPostByID(postId).then(snapshot => {
                if (snapshot.val()) {
                    onSetPost({
                        ...snapshot.val(),
                        key: postId
                    })
                }
            })
        }
    }

    public render() {
        const { post }: any = this.props;
        const comments = post.comments;

        return (post 
            ? (
            <div>
                <h3>{ post.subject }</h3>
                <p>{ post.content }</p>
                <h2>Comment</h2>
                <FormCreateComment />
                {!!comments && <CommentList comments={comments} />}
            </div>
            ) : (
            <div>
                <h3>Loading brain power...</h3>
            </div>
            )
        );
    }
}

const mapStateToProps = (state: any) => ({
    post: state.postState.post,
    currentUser: state.userState.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetPost: (post: any) => dispatch({ type: "POST_SET_POST", post }),
});

export const Post = connect(
        mapStateToProps,
        mapDispatchToProps
)(withRouter(PostComponent))