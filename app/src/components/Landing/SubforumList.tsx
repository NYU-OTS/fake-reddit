import * as React from "react";

interface InterfaceProps {
    subforums?: any;
}

export class SubforumList extends React.Component<InterfaceProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { subforums }: any = this.props;

        return (
            <div>
                <h2>List of Subforums</h2>
                {
                    Object.keys(subforums).map(key => (
                        <div key={key}>{key}</div>
                    ))
                }
            </div>
        );
    }
}