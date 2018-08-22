import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { db } from '../../firebase';

export class PostListComponent extends React.Component {
  private INITIAL_STATE = {
    refPosts: null
  }

  constructor(props: any) {
    super(props);
    this.state = this.INITIAL_STATE
  }

  public componentWillUnmount() {
    const { refPosts }: any = this.state
    this.setState(this.INITIAL_STATE)
    refPosts.off()
  }

  public componentDidMount() {
    const { subforum, onSetPosts }: any = this.props;
    const refPosts = db.refPostsBySubforum(subforum.name)
    this.setState({ ...this.state, refPosts })
    refPosts.on('value', (snapshot: any) => {
      if (snapshot.val()) {
        onSetPosts(snapshot.val())
      }
    })
  }

  public render() {
    const { posts }: any = this.props;

    return (
      <div>
        <h2>Posts in this Subforum</h2>
        <hr />
        {
          posts
            ? Object.keys(posts).map(key => (
              <div key={key}>
                <h4><Link to={routes.POST + '/' + key}>{posts[key].subject}</Link></h4>
                <p>{posts[key].poster} | {posts[key].timestamp}</p>
              </div>
            ))
            : <div>Loading...</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  subforum: state.subforumState.subforum,
  posts: state.subforumState.posts
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetPosts: (posts: any) => dispatch({ type: "SUBFORUM_SET_POSTS", posts }),
});

export const PostList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListComponent)