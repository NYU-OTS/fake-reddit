import * as React from 'react';
import * as routes from '../../constants/routes';

interface InterfaceProps {
  posts?: any;
}

export class PostList extends React.Component<InterfaceProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { posts }: any = this.props;


    return (
      <div>
        <h2>List of Posts on this Subforum</h2>
        <hr />
        {
          Object.keys(posts).map(key => (
            <div key={key}>
              <h4><a href={routes.POST + '/' + key}>{posts[key].subject}</a></h4>
              <p>{posts[key].poster} | {posts[key].timestamp}</p>
            </div>
          ))
        }
      </div>
    );
  }
}
