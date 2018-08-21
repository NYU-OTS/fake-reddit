import * as React from "react";

interface InterfaceProps {
  users?: any;
}

export class UserList extends React.Component<InterfaceProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { users }: any = this.props;

    return (
      <div>
        {
          Object.keys(users).map(key => (
            <div key={key}>{users[key]}</div>
          ))
        }
      </div>
    );
  }
}