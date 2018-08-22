import * as React from 'react'

interface IState {
    time: number;
}

export class Timer extends React.Component<{}, IState> {
    private timeInterval: NodeJS.Timer;

    private INITIAL_STATE = {
        time: 0
    }

    constructor(props: any) {
        super(props)
        this.state = this.INITIAL_STATE
    }

    public componentDidMount() {
        this.timeInterval = setInterval(() => {
            this.setState({ time: Date.now() })
        }, 1000);
    }

    public componentWillUnmount() {
        clearInterval(this.timeInterval)
        this.setState(this.INITIAL_STATE)
    }

    public render() {
        const { time } = this.state;
        return (
            <h5>{!!time && time}</h5>
        )
    }
}