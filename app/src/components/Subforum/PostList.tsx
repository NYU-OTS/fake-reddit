import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { db } from '../../firebase';

export class PostListComponent extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    const { subforum, onSetPosts }: any = this.props;

    db.onceGetPostsBySubforum(subforum.name).then(snapshot => {
      if (snapshot.val()) {
        onSetPosts(snapshot.val())
      }
    }).catch(error => {
      console.log(error)
    })
  }

  public render() {
    const { posts }: any = this.props;

    return (
      <div>
        <h2>List of Posts on this Subforum</h2>
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