import * as React from 'react'
import { connect } from 'react-redux';
import { Timer } from '../../components/Landing/Timer'

interface IState {
    timeNow: any;
}

class TimerContainer extends React.Component<{}, IState> {
    private timeInterval: NodeJS.Timer;
    private INITIAL_STATE = {
        timeNow: 0
    }

    constructor(props: any) {
        super(props)
        this.state = this.INITIAL_STATE
    }

    public componentDidMount() {
        this.timeInterval = setInterval(() => {
            this.setState({ timeNow: Date.now() })
        }, 1000);
    }

    public componentWillUnmount() {
        clearInterval(this.timeInterval)
        this.setState(this.INITIAL_STATE)
    }

    public render() {
        const { timeNow } = this.state;
        return React.createElement(Timer, { timeNow })
    }
}

export default connect(null, null)(TimerContainer)