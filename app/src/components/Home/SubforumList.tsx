import * as React from "react";
import * as routes from '../../constants/routes';

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
                        <p><a href={routes.SUBFORUM + `/${key}`} key={key}>{key}</a></p>
                    ))
                }
            </div>
        );
    }
}