import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Post } from "../../components/Post";
import * as routes from '../../constants/routes'
import { db } from "../../firebase"

interface IProps {
    post: {
        subject: string;
        content: string;
    }
}

class PostContainer extends React.Component<IProps> {
    constructor(props: any) {
        super(props)
    }

    public componentDidMount() {
        const {
            onSetPost,
            onSetComments,
            location
        }: any = this.props;
        const path = location.pathname;
        const prefixLength = routes.POST.length + 1;
        const isValidPath =
            path.startsWith(routes.POST + '/') &&
            path.length > prefixLength;

        if (isValidPath) {
            let postId = path.substring(prefixLength);
            if (postId.indexOf('/') > 0) {
                postId = postId.substring(0, postId.indexOf('/'))
            }

            db.onceGetPostByID(postId).then(snapshot => {
                if (snapshot.val()) {
                    const post = { ...snapshot.val(), key: postId }
                    onSetPost(post)
                    const refComments = db.refComments()
                    this.setState({ ...this.state, refComments })
                    refComments.child(post.key).on(
                        'value',
                        (commentsSnapshot: any) => {
                            onSetComments(commentsSnapshot.val());
                        }
                    )
                }
            })
        }
    }

    public render() {
        const { post } = this.props;
        return React.createElement(Post, { post })
    }
}

const mapStateToProps = (state: any) => ({
    post: state.postState.post,
    currentUser: state.userState.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetPost: (post: any) => dispatch({ type: "POST_SET_POST", post }),
    async onSetComments(comments: any) {
        return await dispatch({ type: 'POST_SET_COMMENTS', comments })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PostContainer))