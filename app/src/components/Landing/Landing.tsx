import * as React from 'react'
import { SubforumList } from './SubforumList';
import { Timer } from './Timer'

interface IProps {
    subforums: {};
    notif: string;
}

export class Landing extends React.Component<IProps> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        const { notif, subforums } = this.props;
        return (
            <div>
                {React.createElement(SubforumList, subforums)}
                <p>{notif}</p>
                <Timer />
            </div>
        )
    }
}