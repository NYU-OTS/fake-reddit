import * as React from 'react'
import SubforumList from '../../containers/Landing/SubforumList'
import { Timer } from './Timer'

interface IProps {
    notif: string;
}

export class Landing extends React.Component<IProps> {
    public render() {
        const { notif } = this.props;
        return (
            <div>
                <SubforumList />
                <p>{notif}</p>
                <Timer />
            </div>
        )
    }
}