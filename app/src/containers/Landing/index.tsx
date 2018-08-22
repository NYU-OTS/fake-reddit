import * as React from "react";
import { connect } from "react-redux";
import { Landing } from '../../components/Landing/Landing'
import { db } from "../../firebase";

interface IProps {
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
  onShowNotification: (notif: string) => {
    dispatch({ type: "SHOW_NOTIFICATION", notif })
  },
  onHideNotification: () => {
    setTimeout(() => {
      return dispatch({ type: "HIDE_NOTIFICATION" })
    }, 5000)
  },
  async onSetSubforums(subforums: any) {
    await dispatch({ type: 'FORUM_SET_SUBFORUMS', subforums })
  }
});

class LandingComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)
  }

  public componentDidMount() {
    const {
      onSetSubforums,
      onShowNotification,
      onHideNotification,
    } = this.props

    // FIXME: Changing from once() to on() breaks the object
    db.onceGetSubforums().then(snapshot => {
      onSetSubforums(snapshot.val())
    })

    onShowNotification('Hiiiiiiiiiiiiiiiiiiiiiiiii!')
    onHideNotification()
  }

  public render() {
    const { subforums, notif } = this.props
    return React.createElement(Landing, { subforums, notif })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingComponent);