import * as React from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";
import { SubforumList } from "../Forum/SubforumList";

interface InterfaceProps {
  onSetSubforums: any;
  onShowNotification: any;
  onHideNotification: any;
  notif: string;
  subforums: {};
}

const mapStateToProps = (state: any) => ({
  subforums: state.forumState.subforums,
  notif: state.userState.notif,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetSubforums: (subforums: any) => dispatch({ type: "FORUM_SET_SUBFORUMS", subforums }),
  onShowNotification: (notif: string) => dispatch({ type: "SHOW_NOTIFICATION", notif }),
  onHideNotification: () => {
    setTimeout(() => {
      return dispatch({ type: "HIDE_NOTIFICATION" })
    }, 5000)
  },
});

class LandingComponent extends React.Component<
  InterfaceProps, { time: any }
  > {

  public timeInterval: NodeJS.Timer;
  public notificationInterval: NodeJS.Timer;

  constructor(props: Readonly<InterfaceProps>) {
    super(props)
    this.state = {
      time: null
    }
  }
  public componentDidMount() {
    const {
      onSetSubforums,
      onShowNotification,
      onHideNotification,
    } = this.props

    db.onceGetSubforums().then(snapshot => {
      onSetSubforums(snapshot.key)
    })

    onShowNotification('Hiiiiiiiiiiiiiiiiiiiiiiiii!')
    onHideNotification()
    this.timeInterval = setInterval(() => {
      this.setState({ time: Date.now() })
    }, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  public render() {
    const { notif } = this.props;
    const { time } = this.state;
    return (
      <div>
        <SubforumList />
        <p>{notif}</p>
        <h5>{!!time && time}</h5>
      </div>
    )
  }
}

export const Landing = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingComponent);