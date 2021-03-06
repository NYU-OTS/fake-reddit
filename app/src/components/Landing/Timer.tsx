import * as React from 'react'

interface IState {
    timeNow: number;
}

export class Timer extends React.Component<{}, IState> {
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
        return <h5>{!!timeNow && timeNow}</h5>
    }
}