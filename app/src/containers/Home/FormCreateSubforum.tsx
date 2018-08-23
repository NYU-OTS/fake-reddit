import * as React from "react";
import { connect } from "react-redux";
import { FormCreateSubforum } from "../../components/Home/FormCreateSubforum";
import { db } from "../../firebase";

interface InterfaceProps {
    currentUser: any;
}

const mapStateToProps = (state: any) => ({
    currentUser: state.userState.currentUser,
});

class FormCreateSubforumContainer extends React.Component<InterfaceProps> {
    constructor(props: InterfaceProps) {
        super(props);
    }

    public handleSubmit = (value: any) => {
        const name = value.name;
        const description = value.description;
        const { currentUser } = this.props;
        const uid = currentUser.uid;
        const username = currentUser.username;
        console.log(name, description)

        db.doCreateSubforum(uid, username, name.trim(), description).then(() => {
            window.location.href = '/'
        }).catch(error => {
            console.log(error)
        });
    }

    public handleChange = (value: any) => {
        console.log(value)
    }

    public render() {
        return (
        <FormCreateSubforum 
            onSubmit={this.handleSubmit} 
            onChange={this.handleChange}
        />
        )
    }
}

export default connect(
    mapStateToProps,
)(FormCreateSubforumContainer);