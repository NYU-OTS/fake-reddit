import * as React from "react";

interface InterfaceProps {
  comments?: any;
}

export class CommentList extends React.Component<InterfaceProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { comments }: any = this.props;

    return (
      <div>
        <h2>Comments on this Post</h2>
        <hr />
        {
          Object.keys(comments).map(key => (
            <div key={key}>
              <p>{comments[key].poster} | {comments[key].timestamp}</p>
              <p>{comments[key].content}</p>
              <hr />
            </div>
          ))
        }
      </div>
    );
  }
}