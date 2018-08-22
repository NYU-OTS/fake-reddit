import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as routes from '../../constants/routes';
import { db } from "../../firebase";

const mapStateToProps = (state: any) => ({
    subforums: state.forumState.subforums,
});

const mapDispatchToProps = (dispatch: any) => ({
    async onSetSubforums(subforums: any) {
        return await dispatch({ type: 'FORUM_SET_SUBFORUMS', subforums })
    }
});

class SubforumListComponent extends React.Component {
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

        return (
            subforums
                ? (
                    <div>
                        <h2>List of Subforums</h2>
                        {
                            Object.keys(subforums).map(key => (
                                <p key={key}>
                                    <Link to={routes.SUBFORUM + `/${key}`} key={key}>
                                        {key}
                                    </Link>
                                </p>
                            ))
                        }
                    </div>
                ) : (
                    <div>Loading subforums...</div>
                )
        );
    }
}

export const SubforumList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubforumListComponent)