import * as React from "react";

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
              <h4>{posts[key].subject}</h4>
              <p>{posts[key].poster}</p>
              <p>{posts[key].timestamp}</p>
              <p>{posts[key].content}</p>
              <hr />
            </div>
          ))
        }
      </div>
    );
  }
}
