import * as React from "react";
import { connect } from "react-redux";
import { CommentList } from "../../components/Post/CommentList";

class CommentListContainer extends React.Component {
  private INITIAL_STATE = {
    refComments: null
  }

  constructor(props: any) {
    super(props);
    this.state = this.INITIAL_STATE
  }

  public render() {
    const { comments }: any = this.props;
    return React.createElement(CommentList, comments)
  }
}

const mapStateToProps = (state: any) => ({
  post: state.postState.post,
  comments: state.postState.comments
});

export default connect(
  mapStateToProps,
)(CommentListContainer)