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
        <h2>List of Posts on this Subforum</h2>
        <hr />
        {
          Object.keys(comments).map(key => (
            <div key={key}>
              <p>{comments[key].poster}</p>
              <p>{comments[key].content}</p>
              <hr />
            </div>
          ))
        }
      </div>
    );
  }
}