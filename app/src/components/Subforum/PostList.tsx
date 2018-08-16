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
        {
          Object.keys(posts).map(key => (
            <div key={key}>{posts[key].subject}</div>
          ))
        }
      </div>
    );
  }
}
