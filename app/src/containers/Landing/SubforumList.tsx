import * as React from "react";
import { connect } from "react-redux";
import { SubforumList } from '../../components/Landing/SubforumList'
import { db } from "../../firebase";

const mapStateToProps = (state: any) => ({
    subforums: state.forumState.subforums,
});

const mapDispatchToProps = (dispatch: any) => ({
    async onSetSubforums(subforums: any) {
        return await dispatch({ type: 'FORUM_SET_SUBFORUMS', subforums })
    }
});

class SubforumListContainer extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        const { onSetSubforums }: any = this.props;

        db.onceGetSubforums().then(snapshot => {
            onSetSubforums(snapshot.val())
        })
    }

    public componentWillUnmount() {
        const { onSetSubforums }: any = this.props;
        onSetSubforums(null)
    }

    public render() {
        const { subforums }: any = this.props;

        return React.createElement(SubforumList, subforums)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubforumListContainer)