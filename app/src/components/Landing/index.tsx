import * as React from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";
import { SubforumList } from "../Forum/SubforumList";

interface InterfaceProps {
  currentUser: any;
  onSetSubforums: any;
  onShowNotification: any;
  onHideNotification: any;
  message: string;
  subforums: {};
}

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
  subforums: state.forumState.subforums,
  message: state.userState.message,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetUsers: (users: any) => dispatch({ type: "SUBFORUM_SET_USERS", users }),
  onSetSubforums: (subforums: any) => dispatch({ type: "FORUM_SET_SUBFORUMS", subforums }),
  onShowNotification: (message: string) => {
    setTimeout(() => {
      return dispatch({ type: "SHOW_NOTIFICATION", message })
    }, 5000)
  },
  onHideNotification: () => {
    setTimeout(() => {
      return dispatch({ type: "HIDE_NOTIFICATION" })
    }, 10000)
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
      onSetSubforums(snapshot.val())
    })

    onShowNotification('Heyyy your attention please...Nevermind!')
    onHideNotification()
    this.timeInterval = setInterval(() => {
      this.setState({ time: Date.now() })
    }, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  public render() {
    const { currentUser, subforums, message } = this.props;
    const { time } = this.state;
    return (
      currentUser
        ? (
          <div>
            <h2>Subforums</h2>
            <h5>{!!time && time}</h5>
            <p>{message}</p>
            {!!subforums && <SubforumList subforums={subforums} />}
          </div>
        )
        : (
          <div>
            <h2>Landing Page</h2>
          </div>
        )
    )
  }
}

export const Landing = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingComponent);