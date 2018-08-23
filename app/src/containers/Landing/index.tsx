import * as React from "react";
import { connect } from "react-redux";
import { Landing } from '../../components/Landing'

interface IProps {
  onSetSubforums: any;
  onShowNotification: any;
  onHideNotification: any;
  notif: string;
}

const mapStateToProps = (state: any) => ({
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
  }
});

class LandingComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)
  }

  public componentDidMount() {
    const {
      onShowNotification,
      onHideNotification,
    } = this.props

    onShowNotification('Hiiiiiiiiiiiiiiiiiiiiiiiii!')
    onHideNotification()
  }

  public render() {
    const { notif } = this.props
    return React.createElement(Landing, { notif })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingComponent);