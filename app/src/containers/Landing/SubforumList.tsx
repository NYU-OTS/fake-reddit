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
    private INITIAL_STATE = {
        refSubforums: null
    }

    constructor(props: any) {
        super(props);
        this.state = this.INITIAL_STATE
    }

    public componentDidMount() {
        const { onSetSubforums }: any = this.props;
        const refSubforums = db.refSubforums()
        this.setState({ ...this.state, refSubforums })
        refSubforums.on('value', (snapshot: any) => {
            const names = {};
            snapshot.forEach((child: any) => {
                names[child.key] = child.key
            })
            onSetSubforums(names)
        })
    }

    public componentWillUnmount() {
        const { onSetSubforums }: any = this.props;
        const { refSubforums }: any = this.state;
        if (refSubforums) {
            refSubforums.off()
        }
        this.setState(this.INITIAL_STATE)
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